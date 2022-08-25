import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req, res) {
  const { pathname, origin } = req.nextUrl
  const secret_key = process.env.NEXTAUTH_SECRET;
  console.log(req.nextUrl.pathname)

  if (pathname.startsWith('/guestbook') ||
    pathname.startsWith('/api/post') ||
    pathname.startsWith('/api/comment/*')
  ) {
    console.log('middleware secret_key')
    console.log(secret_key)
    if (!secret_key) {
      return NextResponse.redirect(`${origin}/api/auth/signin`);
      // return NextResponse.status(451);
    }

    const session = await getToken({ req, secret: secret_key });
    console.log('middleware session')
    console.log(session)
    if (!session) {
      return NextResponse.redirect(`${origin}/api/auth/signin`);
    } else {
      return NextResponse.next();
    }

    // return NextResponse.next();
  }
  return NextResponse.next();
}
