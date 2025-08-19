import { NextRequest, NextResponse } from "next/server";
import PostgresPostRepository from "@/utils/postgres-post-repository";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        if (!data.title || data.title.length < 2){
            throw new Error('Title must be at least 2 characters long');
        }

        if (!data.description || data.description.length < 10) {
            throw new Error('Description must be at least 10 characters long');
        }

        if (!data.author || data.author.length < 3) {
            throw new Error('Author must be at least 3 characters long');
        }

        const repository = new PostgresPostRepository();
        await repository.save(data.title, data.description, data.author);

        return NextResponse.json({
            message: 'Post data saved succesfully',
        });

    } catch (error) {
        console.error('Error validating:', error);
        return NextResponse.json({
            error: error instanceof Error ? error.message: 'Failed to validate'
        }, {status: 400});
    }

}