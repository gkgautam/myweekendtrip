import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  // return NextResponse.redirect(new URL('/home', request.url))
  const token = request.cookies.get('session')?.value;
  const url = request.nextUrl.pathname;
  if(token && url!=='/account/home'){
    return NextResponse.redirect(new URL('/account/home', request.url));
  }

  if(token && url==='/login'){
    return NextResponse.redirect(new URL('/account/home', request.url));
  }
  if(url==='/account/home' && !token){
    return NextResponse.redirect(new URL('/login',request.url));
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/login','/account/home'],
}