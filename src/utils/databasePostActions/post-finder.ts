import Post from "../post";
import PostgresPostRepository from "../postRepositories/postgres-post-repository";

export default class PostFinder {
    constructor() {
    }

    getAll(): Promise<Post[]> {
        const repository = new PostgresPostRepository();
        return repository.getAll();
    }

}
