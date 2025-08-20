import { NextRequest, NextResponse } from "next/server";
import PostRegister from "@/utils/post-register";
import Post from "@/utils/post";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        const post = Post.create(
            data.title,
            data.description,
            data.author
        );

        const postRegister = new PostRegister(post);
        await postRegister.savePost();
        
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