import Post from "../post";
import PostRepository from "../postRepositories/post-repository";

export default class PostRegister {

    #post: Post;
    #repository: PostRepository;

    constructor(post: Post, repository: PostRepository) {
        this.#post = post;
        this.#repository = repository;
    }

    savePost(): Promise<void> {
        return this.#repository.save(this.#post);
    }

}
