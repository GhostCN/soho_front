
// This function can be marked `async` if using `await` inside
import {NextResponse} from "next/server";

export function middleware(request) {
    const user =  request.cookies.get('user')
    const currentUser=user && JSON.parse(user.value);
    const url = request.nextUrl.clone();
    if(!currentUser &&  url.pathname.includes('dashboard')){
       url.pathname='login';
       return NextResponse.redirect(url);
    }
    //return NextResponse.redirect(new URL('/', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/dashboard/:path*',
}