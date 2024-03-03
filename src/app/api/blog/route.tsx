import { Post } from '@/lib/models';
import { connectToDb } from '@/lib/utils';
import { NextResponse } from 'next/server';

export const GET = async () => {
	try {
		connectToDb();
		const posts = await Post.find();
		console.log('postslar:', posts);
		return NextResponse.json(posts);
	} catch (err) {
		console.log(err);
	}
	throw new Error('Failed to fetch posts!');
};
