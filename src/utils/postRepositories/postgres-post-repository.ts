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
}