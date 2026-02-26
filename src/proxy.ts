// middleware let us to intercept request between client and server
// this close the url "/ingredients"
// import { type NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";

// // const secret = process.env.NEXTAUTH_SECRET;
// export default async function proxy(request: NextRequest) {
//   const { pathname } = request.nextUrl; ///about
//   const token = await getToken({ req: request }); //returns token or null
//   const protectedRoutes = ["/ingredients"];
//   if (protectedRoutes.some((route) => pathname.startsWith(route))) {
//     if (!token) {
//       const url = new URL("/error", request.url);
//       url.searchParams.set("message", "Not permissions");
//       return NextResponse.redirect(url);
//     }
//   }
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/ingredients"],
// };

import { type NextRequest, NextResponse } from "next/server";
import { getToken, GetTokenParams } from "next-auth/jwt";

// The function must now be named 'proxy' in Next.js 16+
export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let params: GetTokenParams = {
    req: request,
    secret: process.env.AUTH_SECRET ?? "secret",
  };
  if (process.env.NODE_ENV === "production") {
    params = {
      ...params,
      cookieName: "__Secure-authjs.session-token",
    };
  }
  // Pass the secret explicitly to ensure getToken works in the Proxy/Edge runtime
  const token = await getToken(params);
  // const token = await getToken({
  //   req: request,
  //   secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  //   secureCookie: request.nextUrl.protocol === "https:",
  // });

  const protectedRoutes = ["/ingredients", "/recipes/new", "/recipes/:path*"];

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      // Use the provided request.url to ensure absolute URL construction
      const url = new URL("/error", request.url);
      url.searchParams.set("message", "Not permissions");
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/ingredients/:path*", "/recipes/new", "/recipes/:path*"], // Improved matcher for sub-paths
};
