# BuddyScript

A production-grade social feed application built with **Next.js 15** (App Router) designed for high-scale reads and writes.

## Tech Stack

| Layer           | Technology                          |
| --------------- | ----------------------------------- |
| Frontend        | Next.js 15 (App Router, JavaScript) |
| Backend         | Next.js API Routes                  |
| ORM             | Prisma                              |
| Database        | PostgreSQL (Neon)                    |
| Auth            | NextAuth.js (JWT) + bcrypt          |
| Image uploads   | Cloudinary                          |
| Validation      | Zod                                 |

## Getting Started

### Prerequisites

- Node.js ≥ 18
- Neon PostgreSQL database
- Cloudinary account

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

| Variable                | Description                    |
| ----------------------- | ------------------------------ |
| `DATABASE_URL`          | Neon PostgreSQL connection URL |
| `NEXTAUTH_SECRET`       | Random secret for JWT signing  |
| `NEXTAUTH_URL`          | App URL (http://localhost:3000)|
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name          |
| `CLOUDINARY_API_KEY`    | Cloudinary API key             |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret          |

## Architecture

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

| Method | Endpoint                        | Description               |
| ------ | ------------------------------- | ------------------------- |
| POST   | `/api/auth/register`            | Create account            |
| GET    | `/api/posts?cursor=X&limit=20`  | Feed (cursor pagination)  |
| POST   | `/api/posts`                    | Create post               |
| GET    | `/api/posts/[id]`               | Single post               |
| DELETE | `/api/posts/[id]`               | Soft delete post          |
| POST   | `/api/posts/[id]/like`          | Toggle post like          |
| GET/POST | `/api/posts/[id]/comments`    | List/create comments      |
| POST   | `/api/comments/[id]/like`       | Toggle comment like       |
| GET/POST | `/api/comments/[id]/replies`  | List/create replies       |
| POST   | `/api/replies/[id]/like`        | Toggle reply like         |

### Performance

- **Cursor-based pagination** on all list endpoints (no OFFSET)
- **Prisma `_count`** for like/comment counts (no N+1)
- **Singleton PrismaClient** (critical for serverless)
- **Cache headers**: `s-maxage=10, stale-while-revalidate=59` on public feed

### Security

- JWT auth with `getServerSession()` on every API route
- Authorization checks (ownership on delete)
- Private post filtering server-side
- Zod validation on all POST endpoints
- Rate limiting on auth endpoints
- bcrypt with 12 salt rounds
- Security headers (X-Frame-Options, nosniff, HSTS, Referrer-Policy)

## Project Structure

```
app/
  api/
    auth/[...nextauth]/   # NextAuth handler
    auth/register/        # Registration
    posts/                # Feed CRUD
    posts/[id]/           # Single post
    posts/[id]/like/      # Post likes
    posts/[id]/comments/  # Post comments
    comments/[id]/like/   # Comment likes
    comments/[id]/replies/# Comment replies
    replies/[id]/like/    # Reply likes
  (auth)/
    login/                # Login page
    register/             # Register page
  (protected)/
    feed/                 # Main feed page
lib/
  auth.js                 # NextAuth config
  prisma.js               # Singleton PrismaClient
  validations.js          # Zod schemas
  rate-limit.js           # Rate limiter
  cloudinary.js           # Image upload helper
components/
  Navbar.js               # Top navigation
  PostCard.js             # Post component
  CommentSection.js       # Comments + replies
  LikeButton.js           # Like toggle
  CreatePostForm.js       # Post creation
  AuthProvider.js         # Session provider
```
