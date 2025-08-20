import Post from "./post";
import PostgresPostRepository from "./postgres-post-repository";

export default class PostRegister {

    #post: Post;

    constructor(post: Post) {
        this.#post = post;
    }

    savePost(): Promise<void> {
        const repository = new PostgresPostRepository();
        return repository.save(this.#post);
    }

    static jsonToPost(data: any): Post | null {
        if (!data.title || !data.description || !data.author) {
            return null;
        }
        return new Post(data.title, data.description, data.author);
    }

}
