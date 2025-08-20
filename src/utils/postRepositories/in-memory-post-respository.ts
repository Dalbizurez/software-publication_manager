import PostRepository from "./post-repository";
import Post from "../post";

export default class InMemoryPostRepository implements PostRepository {
    private posts: Post[] = [];

    async save(post: Post): Promise<void> {
        this.posts.push(post);
    }
}
