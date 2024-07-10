import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isPrivateRoute = createRouteMatcher([
  "/organization(.*)",
  "/select-org(.*)",
  "/board(.*)",
  "/activity(.*)",
]);

export default clerkMiddleware((auth, req: NextRequest) => {
  console.log("Incoming request URL:", req.url);
  console.log("User ID:", auth().userId);
  console.log("Org ID:", auth().orgId);

  // Protect private routes
  if (!auth().userId && isPrivateRoute(req)) {
    console.log("Private route without user ID. Redirecting to sign-in.");
    return auth().redirectToSignIn({ returnBackUrl: req.url });
  }

  // Redirect authenticated users to select-org if they have no orgId and they are not already on select-org route
  if (
    auth().userId &&
    !auth().orgId &&
    req.nextUrl.pathname !== "/select-org"
  ) {
    const orgSelection = new URL("/select-org", req.url);
    console.log(
      "User ID present, but no org ID. Redirecting to org selection."
    );
    return NextResponse.redirect(orgSelection);
  }

  // Redirect authenticated users with orgId to organization route
  if (auth().userId && auth().orgId && !isPrivateRoute(req)) {
    const organizationUrl = new URL(`/organization/${auth().orgId}`, req.url);
    console.log(
      "Authenticated user with org ID. Redirecting to organization route:",
      organizationUrl
    );
    return NextResponse.redirect(organizationUrl);
  }

  // Allow authenticated users to access public routes without redirection
  if (!isPrivateRoute(req) && auth().userId) {
    console.log("Authenticated user accessing public route. Allowing access.");
    return NextResponse.next();
  }

  console.log("Request passed through middleware without redirection.");
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
