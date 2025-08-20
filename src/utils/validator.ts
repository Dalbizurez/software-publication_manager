import Post from "./post";

export default class Validator {
    static  textValidation(text:string, length:number, errorMessage:string|null) {
        if (text.length < length) {
            if (errorMessage) {
                throw new Error(errorMessage);
            }
        }
    }

    static postValidation(post: Post | null): boolean {
        if (!post) {
            throw new Error('Post data is incomplete');
        }

        this.textValidation(post.title, 2, 'Title must be at least 2 characters long');
        this.textValidation(post.description, 10, 'Description must be at least 10 characters long');
        this.textValidation(post.author, 3, 'Author must be at least 3 characters long');
        
        return true;
    }
}