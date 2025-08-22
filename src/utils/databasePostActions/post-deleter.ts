import Post from "../post";
import PostRepository from "../postRepositories/post-repository";

export default class PostDeleter {
    #repository: PostRepository;

    constructor(repository: PostRepository) {
        this.#repository = repository;
    }

    delete(id:any): Promise<Post | null> {
        this.#repository.delete(id);
        return Promise.resolve(this.#repository.getById(id));
    }

}
