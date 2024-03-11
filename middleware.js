import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

// Secret key used to sign the JWT tokens
const JWT_SECRET = process.env.JWT_SECRET;

export async function middleware(request) {
    const userCookie = request.cookies.get('user');
/*    if (!userCookie) {
        // Redirect user to login if user cookie is not present
        const url = request.nextUrl.clone(); // Clone the current URL
        url.pathname = '/login'; // Set the pathname to '/login'
        return NextResponse.redirect(url); // Redirect to the modified URL
    }*/
    if(userCookie) {
        try {
            const currentUser = JSON.parse(userCookie.value);
            const token = currentUser.token;
            const decodedToken = jwt.decode(token);
            if (!decodedToken) {
                throw new Error('Invalid token');
            }
            if (decodedToken.exp && Date.now() >= decodedToken.exp * 1000) {
                request.cookies.delete('user')
                throw new Error('Token expired');
            }
            return NextResponse.next();
        } catch (error) {
            request.cookies.delete('user')
        }
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/'],
};
