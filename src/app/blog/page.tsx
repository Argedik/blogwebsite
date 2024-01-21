import PostCard from '@/components/postCard/postCard';
import styles from './blog.module.css';
// import { getPosts } from '@/lib/data';

interface Post {
	userId: number;
	id: number;
	title: string;
	body: string;
}

const getData = async (): Promise<Post[]> => {
	//fetch kısmına , {cache: 'no-store'} eklenerek verilerin tekrar yuklenmesini saglayabiliriz. Aşağıdaki seçenek her 1 saatte bir verilerin yenilenmesini sağlar
	const res = await fetch('http://localhost:3000/api/blog', {
		next: { revalidate: 3600 },
	});

	if (!res.ok) {
		throw new Error('Something went wrong');
	}

	return res.json();
};

const BlogPage = async () => {
	// FETCH DATA WITH AN API
	const posts = await getData();

	// FETCH DATA WITHOUT AN API
	// const posts = await getPosts();

	return (
		<div className={styles.container}>
			{posts.map((post: Post) => (
				<div className={styles.post} key={post.id}>
					<PostCard post={post} />
				</div>
			))}
		</div>
	);
};

export default BlogPage;
