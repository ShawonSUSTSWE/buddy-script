import { createPostSchema } from "@/lib/helpers/validations";
import { AppError } from "@/lib/utils/AppError";
import { postRepository } from "@/repositories/PostRepository";

const transformPost = (post) => {
  const replyCount =
    post.comments?.reduce((sum, c) => sum + (c._count?.replies ?? 0), 0) ?? 0;

  return {
    id: post.id,
    content: post.content,
    imageUrl: post.imageUrl,
    isPrivate: post.isPrivate,
    createdAt: post.createdAt,
    author: post.author,
    likeCount: post._count.likes,
    commentCount: post._count.comments + replyCount,
    userLiked: post.likes.length > 0,
  };
};

export const postService = {
  async getFeed({ cursor, limit, currentUserId }) {
    const posts = await postRepository.findMany({
      cursor,
      limit,
      currentUserId,
    });

    let nextCursor = null;
    if (posts.length > limit) {
      const nextItem = posts.pop();
      nextCursor = nextItem.id;
    }

    return { data: { posts: posts.map(transformPost), nextCursor } };
  },

  async createPost({ body, userId }) {
    const validation = createPostSchema.safeParse({
      ...body,
      authorId: userId,
    });
    if (!validation.success) {
      throw new AppError(validation.error.errors[0].message, 400);
    }

    const post = await postRepository.create({ ...body, authorId: userId });
    return {
      data: { ...post, likeCount: 0, commentCount: 0, userLiked: false },
      statusCode: 201,
    };
  },

  async getPost({ id, currentUserId }) {
    const post = await postRepository.findById({ id, currentUserId });
    if (!post) throw new AppError("Post not found", 404);

    return { data: { ...transformPost(post) } };
  },

  async deletePost({ id, userId }) {
    const post = await postRepository.findOwner(id);
    if (!post || post.deletedAt) throw new AppError("Post not found", 404);
    if (post.authorId !== userId) throw new AppError("Forbidden", 403);

    await postRepository.softDelete(id);
    return { data: { message: "Post deleted successfully" } };
  },
};
