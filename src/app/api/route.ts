import { NextRequest, NextResponse } from "next/server";
import PostRegister from "@/utils/databasePostActions/post-register";
import Post from "@/utils/post";
import PostFinder from "@/utils/databasePostActions/post-finder";

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

export async function GET(request: NextRequest) {
    try {

        const postFinder = new PostFinder();

        const posts = await postFinder.getAll();
        return NextResponse.json(posts);
    } catch (error){
        console.error('Error fetching posts:', error);
        return NextResponse.json({
            error: error instanceof Error ? error.message: 'Failed to fetch posts'
        }, {status: 400});
    }
}