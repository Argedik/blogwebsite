'use server';

import { revalidatePath } from 'next/cache';
import { Post, User } from './models';
import { connectToDb } from './utils';
import { signIn, signOut } from './auth';
// import bcrypt from 'bcryptjs';
const bcrypt = require('bcrypt');
export const addPost = async (_prevState: any, formData: FormData) => {
	// const title = formData.get("title");
	// const desc = formData.get("desc");
	// const slug = formData.get("slug");
	const { title, desc, slug, userId } = Object.fromEntries(formData);

	try {
		connectToDb();
		const newPost = new Post({
			title,
			desc,
			slug,
			userId,
		});

		await newPost.save();
		console.log('saved to db');
		revalidatePath('/blog');
		revalidatePath('/admin');
	} catch (err) {
		console.log(err);
		return { error: 'Something went wrong!' };
	}
};

export const deletePost = async (formData: FormData) => {
	const { id } = Object.fromEntries(formData);

	try {
		connectToDb();

		await Post.findByIdAndDelete(id);
		console.log('deleted from db');
		revalidatePath('/blog');
		revalidatePath('/admin');
	} catch (err) {
		console.log(err);
		return { error: 'Something went wrong!' };
	}
};

export const addUser = async (_prevState: any, formData: FormData) => {
	const { username, email, password, img } = Object.fromEntries(formData);

	try {
		connectToDb();
		const newUser = new User({
			username,
			email,
			password,
			img,
		});

		await newUser.save();
		console.log('saved to db');
		revalidatePath('/admin');
	} catch (err) {
		console.log(err);
		return { error: 'Something went wrong!' };
	}
};

export const deleteUser = async (formData: FormData) => {
	const { id } = Object.fromEntries(formData);

	try {
		connectToDb();

		await Post.deleteMany({ userId: id });
		await User.findByIdAndDelete(id);
		console.log('deleted from db');
		revalidatePath('/admin');
	} catch (err) {
		console.log(err);
		return { error: 'Something went wrong!' };
	}
};

export const handleGithubLogin = async () => {
	'use server';
	await signIn('github');
};

export const handleLogout = async () => {
	'use server';
	await signOut();
};

export const register = async (_prevState: any, formData: FormData) => {
	const { username, email, password, img, passwordRepeat } =
		Object.fromEntries(formData);

	if (password !== passwordRepeat) {
		return { error: 'Passwords do not match' };
	}

	try {
		connectToDb();

		const user = await User.findOne({ username });

		if (user) {
			return { error: 'Username already exists' };
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			username,
			email,
			password: hashedPassword,
			img,
		});

		await newUser.save();
		console.log('saved to db');

		return { success: true };
	} catch (err) {
		console.log(err);
		return { error: 'Something went wrong!' };
	}
};

export const login = async (_prevState: any, formData: FormData) => {
	const { username, password } = Object.fromEntries(formData);

	try {
		await signIn('credentials', { username, password });
	} catch (err) {
		console.log(err);

		if (err instanceof Error) {
			console.log(err.message);

			if (err.message.includes('CredentialsSignin')) {
				return { error: 'Invalid username or password' };
			}
		} else {
			console.log('An unexpected error occurred:', err);
		}
		throw err;
	}
};
