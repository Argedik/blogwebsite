import { Session } from 'next-auth';
import { NextRequest } from 'next/server';
interface MyToken {
	// 'token' nesnesinin içereceği özellikleri burada tanımlayın
	id?: string;
	isAdmin?: boolean;
	// Diğer özellikler...
}

interface MyUser {
	// 'user' nesnesinin içereceği özellikleri burada tanımlayın
	id: string;
	isAdmin: boolean;
	// Diğer özellikler...
}

// Session türünü genişletin
declare module 'next-auth' {
	interface Session {
		user: MyUser;
	}
}

export const authConfig = {
	pages: {
		signIn: '/login',
	},
	providers: [],
	callbacks: {
		// FOR MORE DETAIL ABOUT CALLBACK FUNCTIONS CHECK https://next-auth.js.org/configuration/callbacks
		async jwt({ token, user }: { token: MyToken; user?: MyUser }) {
			if (user) {
				token.id = user.id;
				token.isAdmin = user.isAdmin;
			}
			return token;
		},
		async session({ session, token }: { session: Session; token: MyToken }) {
			if (token) {
				if (session && session.user) {
					session.user.id = token.id as string;
					session.user.isAdmin = token.isAdmin as boolean;
				}
			}
			return session;
		},
		authorized({
			auth,
			request,
		}: {
			auth: { user: Session['user'] & { isAdmin?: boolean } };
			request: NextRequest;
		}) {
			const user = auth?.user;
			const isOnAdminPanel = request.nextUrl?.pathname.startsWith('/admin');
			const isOnBlogPage = request.nextUrl?.pathname.startsWith('/blog');
			const isOnLoginPage = request.nextUrl?.pathname.startsWith('/login');

			// ONLY ADMIN CAN REACH THE ADMIN DASHBOARD

			if (isOnAdminPanel && !user?.isAdmin) {
				return false;
			}

			// ONLY AUTHENTICATED USERS CAN REACH THE BLOG PAGE

			if (isOnBlogPage && !user) {
				return false;
			}

			// ONLY UNAUTHENTICATED USERS CAN REACH THE LOGIN PAGE

			if (isOnLoginPage && user) {
				return Response.redirect(new URL('/', request.nextUrl));
			}

			return true;
		},
	},
};
