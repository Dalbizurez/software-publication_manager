import { NextRequest, NextResponse } from "next/server";
import Validator from "@/utils/validator";
import PostRegister from "@/utils/post-register";
import Post from "@/utils/post";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        const post = PostRegister.jsonToPost(data);

        if (!post || !Validator.postValidation(post)) {
            return NextResponse.json({
                error: 'Invalid post data',
            }, { status: 400 });
        }

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