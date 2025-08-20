import { NextRequest, NextResponse } from "next/server";
import PostgresPostRepository from "@/utils/postgres-post-repository";
import Post from "@/utils/post";
import { jsonToPost, postValidation, savePost } from "@/utils/post-register";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        const post = jsonToPost(data);

        if (!post || !postValidation(post)) {
            return NextResponse.json({
                error: 'Invalid post data',
            }, { status: 400 });
        }

        await savePost(post);
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