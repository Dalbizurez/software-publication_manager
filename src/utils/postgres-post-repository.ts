import { Sql } from 'postgres';
import postgres from 'postgres';

export default class PostgresPostRepository {
    private readonly sql: Sql;

    constructor() {
        const connection = "postgresql://postgres.uroaakadbcwyymfpfwrl:OlKbEkgZclVHsFQk@aws-1-us-east-2.pooler.supabase.com:5432/postgres"
        this.sql = postgres(connection);
    }

    async save(title: string, description: string, author: string): Promise<void> {
        try {
            await this.sql`INSERT INTO post (title, description, author) VALUES (${title}, ${description}, ${author});`;
        } catch (error) {
            console.error(error)
            throw new Error('Failed to save post')
        }
    }
}