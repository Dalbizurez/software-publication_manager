import Post from "../post";

export default interface PostRepository {
    save(post: Post): Promise<void>;

    getAll(): Promise<Post[]>;

    getById(id: any): Promise<Post | null>;

    update(id:any, title?:string, description?:string, author?:string): Promise<void>;

}