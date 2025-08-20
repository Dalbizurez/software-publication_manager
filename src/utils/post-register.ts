import Post from "./post";
import PostgresPostRepository from "./postgres-post-repository";

export function jsonToPost(data: any): Post | null {
    if (!data.title || !data.description || !data.author) {
        return null;
    }
    return new Post(data.title, data.description, data.author);
}

function textValidation(text:string, length:number): boolean {
    if (text.length < length) {
        return false;
    }
    return true;
}

export function postValidation(post: Post | null): boolean {
    if (!post) {
        throw new Error('Post data is incomplete');
    }

    if (!textValidation(post.title, 2)) {
        throw new Error('Title must be at least 2 characters long');
    }
    if (!textValidation(post.description, 10)) {
        throw new Error('Description must be at least 10 characters long');
    }
    if (!textValidation(post.author, 3)) {
        throw new Error('Author must be at least 3 characters long');
    }
    return true;
}

export function savePost(post: Post): Promise<void> {
    const repository = new PostgresPostRepository();
    return repository.save(post);
}