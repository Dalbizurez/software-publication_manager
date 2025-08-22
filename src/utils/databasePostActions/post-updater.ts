import Post from "../post";
import PostRepository from "../postRepositories/post-repository";

export default class PostFinder {
    #repository: PostRepository;

    constructor(repository: PostRepository) {
        this.#repository = repository;
    }

    update(id:any, title?:string, description?:string, author?:string): Promise<Post | null> {
        this.#repository.update(id, title, description, author);
        return Promise.resolve(this.#repository.getById(id));
    }

}
