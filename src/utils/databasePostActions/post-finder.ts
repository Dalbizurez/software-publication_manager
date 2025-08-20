import Post from "../post";
import PostRepository from "../postRepositories/post-repository";

export default class PostFinder {
    #repository: PostRepository;

    constructor(repository: PostRepository) {
        this.#repository = repository;
    }

    getAll(): Promise<Post[]> {
        return this.#repository.getAll();
    }

}
