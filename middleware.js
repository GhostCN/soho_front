import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';


export  function middleware(request, response) { // Corrected parameter name from res to response
    const url = request.nextUrl.clone();
    if (url.pathname.includes('verified')) {
        url.pathname = '/';
        const res = NextResponse.next()
        res.cookies.set({ name: "user", value: "", path: "/" });
        return NextResponse.rewrite(url, res);
    }
    const userCookie = request.cookies.get('user')?.value;

    if (userCookie) {
        try {
            const currentUser = JSON.parse(userCookie);
            const token = currentUser.token;
            const decodedToken = jwt.decode(token);
            if (!decodedToken) {
                throw new Error('Invalid token');
            }
            return NextResponse.next();
        } catch (error) {
            request.cookies.delete('user')
        }
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/', '/verified'],
};
