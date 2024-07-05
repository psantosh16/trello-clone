import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isPrivateRoute = createRouteMatcher([
  "/organization(.*)",
  "/select-org(.*)",
]);

export default clerkMiddleware((auth, req: NextRequest) => {
  if (!isPrivateRoute(req) && auth().userId) {
    let redirectUrl = "/select-org";
    if (auth().orgId) {
      redirectUrl = `/organization/${auth().orgId}`;
    }
    const selectionUrl = new URL(redirectUrl, req.url);
    return NextResponse.redirect(selectionUrl);
  }

  if (!auth().userId && isPrivateRoute(req)) {
    return auth().redirectToSignIn({ returnBackUrl: req.url });
  }

  if (
    auth().userId &&
    !auth().orgId &&
    req.nextUrl.pathname !== "/select-org"
  ) {
    const orgSelection = new URL("/select-org", req.url);
    return NextResponse.redirect(orgSelection);
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
