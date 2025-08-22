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

    async update(id: any, post: Post): Promise<void> {
        const oldPost = await this.getById(id);
        const index = this.posts.findIndex(p => p.id === id);
        if (oldPost) {
            this.posts[index] = post;
        }else {
            throw new Error("Post not found");
        }
    }
}
