import 'next-auth';

declare module 'next-auth' {
	/**
	 * NextAuth.js'in User modeline ek özellikler ekleyin.
	 */
	interface User {
		isAdmin?: boolean;
	}
}
