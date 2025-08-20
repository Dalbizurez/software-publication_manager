import Post from "../post";
import PostgresPostRepository from "../postRepositories/postgres-post-repository";

export default class PostRegister {

    #post: Post;

    constructor(post: Post) {
        this.#post = post;
    }

    savePost(): Promise<void> {
        const repository = new PostgresPostRepository();
        return repository.save(this.#post);
    }

}
