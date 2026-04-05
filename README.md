# BuddyScript

A production-grade social feed application built with **Next.js 15** (App Router) featuring a clean layered architecture with service and repository patterns.

## Tech Stack

| Layer      | Technology                          |
| ---------- | ----------------------------------- |
| Frontend   | Next.js 15 (App Router, JavaScript) |
| Backend    | Next.js API Routes                  |
| ORM        | Prisma                              |
| Database   | PostgreSQL (Neon)                   |
| Auth       | NextAuth.js (JWT) + bcrypt          |
| Validation | Zod                                 |

## Getting Started

### Prerequisites

- Node.js ≥ 18
- Neon PostgreSQL database

### Installation

```bash
# Clone and install
cd buddy-script
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your credentials

# Push Prisma schema to database
npx prisma db push

# Generate Prisma client
npx prisma generate

# Start development server
npm run dev
```

### Environment Variables

| Variable          | Description                     |
| ----------------- | ------------------------------- |
| `DATABASE_URL`    | Neon PostgreSQL connection URL  |
| `NEXTAUTH_SECRET` | Random secret for JWT signing   |
| `NEXTAUTH_URL`    | App URL (http://localhost:3000) |

## Architecture

### Layered Architecture

The project follows a clean **Route → Middleware → Service → Repository** pattern:

```
API Route (route.js)
  └─ withHandler (middleware)
       ├─ Auth check (getUserFromRequest)
       ├─ Request adaptation (requestAdapter)
       └─ Service Layer
            └─ Repository Layer
                 └─ Prisma (Database)
```

- **Routes** — Thin handlers that delegate to services
- **Middleware** (`withHandler`) — Centralized auth, error handling, request/response formatting
- **Services** — Business logic and validation
- **Repositories** — Database queries via Prisma

### Database Schema

```
User ─┬─ Post ──── Comment ──── Reply
      │    │          │            │
      │    └── Like   └── Like     └── Like
      └────────────────────────────────┘
```

- **Polymorphic likes**: Single `Like` table with nullable `postId`, `commentId`, `replyId`
- **Soft deletes**: `deletedAt` field on Post, Comment, Reply
- **Composite indexes** for feed queries, comment lookups, and like uniqueness

### API Endpoints

| Method   | Endpoint                       | Description              |
| -------- | ------------------------------ | ------------------------ |
| POST     | `/api/auth/register`           | Create account           |
| GET      | `/api/posts?cursor=X&limit=20` | Feed (cursor pagination) |
| POST     | `/api/posts`                   | Create post              |
| GET      | `/api/posts/[id]`              | Single post              |
| DELETE   | `/api/posts/[id]`              | Soft delete post         |
| POST     | `/api/posts/[id]/like`         | Toggle post like         |
| GET/POST | `/api/posts/[id]/comments`     | List/create comments     |
| POST     | `/api/comments/[id]/like`      | Toggle comment like      |
| GET/POST | `/api/comments/[id]/replies`   | List/create replies      |
| POST     | `/api/replies/[id]/like`       | Toggle reply like        |

### Performance

- **Cursor-based pagination** on all list endpoints (no OFFSET)
- **Prisma `_count`** for like/comment counts (no N+1)
- **Singleton PrismaClient** (critical for serverless)

### Security

- JWT auth via NextAuth on every protected API route
- Authorization checks (ownership on delete)
- Private post filtering server-side
- Zod validation on all POST endpoints
- bcrypt with 12 salt rounds

## Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/                  # Login page
│   │   └── register/               # Register page
│   ├── (protected)/
│   │   └── feed/                   # Main feed page
│   └── api/
│       ├── auth/
│       │   ├── [...nextauth]/      # NextAuth handler
│       │   └── register/           # Registration endpoint
│       ├── posts/                  # Feed CRUD
│       │   └── [id]/
│       │       ├── comments/       # Post comments
│       │       └── like/           # Post likes
│       ├── comments/
│       │   └── [id]/
│       │       ├── replies/        # Comment replies
│       │       └── like/           # Comment likes
│       └── replies/
│           └── [id]/
│               └── like/           # Reply likes
│
├── components/
│   ├── AuthProvider.js             # NextAuth SessionProvider
│   ├── login/
│   │   └── LoginForm.js            # Login form fields
│   ├── register/
│   │   └── RegistrationForm.js     # Registration form fields
│   └── feed/
│       ├── Navbar.jsx              # Top navigation bar
│       ├── FeedLoader.jsx          # Loading spinner
│       ├── post/
│       │   ├── CreatePostForm.jsx  # Post creation
│       │   ├── PostCard.jsx        # Post display card
│       │   ├── PostFeed.jsx        # Post list with infinite scroll
│       │   ├── PostFormActions.jsx  # Post form action buttons
│       │   └── PostLikeCommentShare.jsx # Post interaction bar
│       ├── comment/
│       │   ├── CommentSection.jsx  # Comment list per post
│       │   ├── Comment.jsx         # Single comment with replies
│       │   └── Reply.jsx           # Single reply
│       ├── like/
│       │   └── LikeButton.jsx      # Reusable like toggle
│       ├── sidebar/
│       │   ├── LeftSidebar.jsx     # Left sidebar layout
│       │   ├── ExploreSection.jsx  # Explore navigation links
│       │   ├── EventsSection.jsx   # Events widget
│       │   ├── RightSideBar.jsx    # Right sidebar (profile + logout)
│       │   ├── YouMightLike.jsx    # Suggested pages
│       │   ├── SuggestedPeople.jsx # People suggestions
│       │   └── FriendsList.jsx     # Friends list with status
│       └── stories/
│           ├── StoriesDesktop.jsx  # Story carousel (desktop)
│           └── StoriesMobile.jsx   # Story carousel (mobile)
│
├── sections/
│   ├── login/
│   │   └── LoginSection.jsx        # Login page section
│   ├── register/
│   │   └── RegisterSection.jsx     # Register page section
│   └── feed/
│       └── FeedSection.jsx         # Feed page orchestrator
│
├── services/
│   ├── AuthService.js              # Registration logic
│   ├── PostService.js              # Post CRUD + feed logic
│   ├── CommentService.js           # Comment CRUD
│   ├── ReplyService.js             # Reply CRUD
│   └── LikeService.js              # Polymorphic like toggling
│
├── repositories/
│   ├── UserRepository.js           # User DB queries
│   ├── PostRepository.js           # Post DB queries
│   ├── CommentRepository.js        # Comment DB queries
│   ├── ReplyRepository.js          # Reply DB queries
│   └── LikeRepository.js           # Like DB queries
│
├── lib/
│   ├── config/
│   │   ├── auth.js                 # NextAuth configuration
│   │   ├── prisma.js               # Singleton PrismaClient
│   │   └── Message.js              # Response message constants
│   ├── middleware/
│   │   ├── withHandler.js          # Unified API handler wrapper
│   │   ├── auth.js                 # JWT token extraction
│   │   ├── requestAdapter.js       # Request normalization
│   │   └── responseHandler.js      # Standard JSON responses
│   ├── helpers/
│   │   └── validations.js          # Zod schemas
│   └── utils/
│       ├── ApiClient.js            # Client-side fetch wrapper
│       ├── AppError.js             # Custom error class
│       ├── ToastUtils.js           # Toast notification helpers
│       └── UserUtils.js            # Avatar utilities
│
├── middleware.js                    # Route protection (auth redirects)
│
└── prisma/
    └── schema.prisma               # Database schema
```
