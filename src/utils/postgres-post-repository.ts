import { Sql } from 'postgres';
import postgres from 'postgres';
import Post from './post';

export default class PostgresPostRepository {
    private readonly sql: Sql;

    constructor() {
        const connection = "postgresql://postgres.uroaakadbcwyymfpfwrl:OlKbEkgZclVHsFQk@aws-1-us-east-2.pooler.supabase.com:5432/postgres"
        this.sql = postgres(connection);
    }

    async save(post: Post): Promise<void> {
        try {
            await this.sql`INSERT INTO post (title, description, author) VALUES (${post.title}, ${post.description}, ${post.author});`;
        } catch (error) {
            console.error(error)
            throw new Error('Failed to save post')
        }
    }
}