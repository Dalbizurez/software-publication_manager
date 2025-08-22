import { Sql } from 'postgres';
import postgres from 'postgres';
import Post from '../post';
import PostRepository from './post-repository';

export default class PostgresPostRepository implements PostRepository {
    private readonly sql: Sql;

    constructor() {
        const connection = "postgresql://postgres.uroaakadbcwyymfpfwrl:OlKbEkgZclVHsFQk@aws-1-us-east-2.pooler.supabase.com:5432/postgres"
        this.sql = postgres(connection);
    }

    async save(post: Post): Promise<void> {
        try {
            await this.sql`INSERT INTO post (title, description, author) VALUES (${post.title.value}, ${post.description.value}, ${post.author.value});`;
        } catch (error) {
            console.error(error)
            throw new Error('Failed to save post')
        }
    }

    async getAll(): Promise<Post[]> {
        try{
            const result = await this.sql`SELECT * FROM post`;
            return result.map(row => new Post(row.title, row.description, row.author, row.id));
        } catch (error) {
            console.error(error);
            throw new Error('Failed to retrieve posts');
        }
    }

    async getById(id: any): Promise<Post> {
        try {
            const result = await this.sql`SELECT * FROM post WHERE id = ${id}`;
            if (result.length) {
                const post = Post.create(result[0].title, result[0].description, result[0].author)
                post.id = result[0].id;
                return post;
            }
            throw new Error('Post not found');
        } catch (error) {
            console.error(error);
            throw new Error('Failed to retrieve post');
        }
    }

    async update(id: any, title?:string, description?:string, author?:string): Promise<void> {
        try {
            const post = await this.getById(id);
            console.log(title?? post.title.value, description ?? post.description.value, author ?? post.author.value);
            await this.sql`UPDATE post SET title = ${title ?? post.title.value}, description = ${description ?? post.description.value}, author = ${author ?? post.author.value} WHERE id = ${id}`;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to update post');
        }
    }

    async delete(id: any): Promise<void> {
        try {
            await this.sql`DELETE FROM post WHERE id = ${id}`;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to delete post');
        }
    }
}