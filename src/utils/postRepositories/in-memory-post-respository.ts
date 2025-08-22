import PostRepository from "./post-repository";
import Post from "../post";
import { randomUUID } from "crypto";

export default class InMemoryPostRepository implements PostRepository {
    private posts: Post[] = [];

    async save(post: Post): Promise<void> {
        post.id = randomUUID();
        this.posts.push(post);
    }

    async getAll(): Promise<Post[]> {
        return this.posts;
    }

    getById(id: any): Promise<Post | null> {
        const index = this.posts.findIndex(p => p.id === id);
        return Promise.resolve(this.posts[index] || null);
    }

    async update(id: any, title?: string, description?: string, author?: string): Promise<void> {
        const oldPost = await this.getById(id);
        const index = this.posts.findIndex(p => p.id === id);
        if (oldPost) {
            const updatedPost = Post.create(
                title ?? oldPost.title.value,
                description ?? oldPost.description.value,
                author ?? oldPost.author.value
            );
            updatedPost.id = id;
            this.posts[index] = updatedPost;
        } else {
            throw new Error("Post not found");
        }
    }

    async delete(id: any): Promise<void> {
        const index = this.posts.findIndex(p => p.id === id);
        if (index !== -1) {
            this.posts.splice(index, 1);
        } else {
            throw new Error("Post not found");
        }
    }


}
