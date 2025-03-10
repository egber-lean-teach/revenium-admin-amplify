import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const tenantKeys = {
  tenant1: {
    publishableKey:
      "pk_test_ZHJpdmluZy1wZWFjb2NrLTIzLmNsZXJrLmFjY291bnRzLmRldiQ",
    secretKey: "sk_test_6Ag9d6MI85UWzl76FijEa7tUzuNujJQc4BoPQj5pKI",
    signInurl: "https://main.dn2z7s6cf30is.amplifyapp.com/sign-in",
    signUpUrl: "https://main.dn2z7s6cf30is.amplifyapp.com/sign-up",
    domain: "https://main.dn2z7s6cf30is.amplifyapp.com",
  },
};
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/texts(.*)",
  "api/cookies(.*)",
]);

export default clerkMiddleware(
  async (auth, req) => {
    if (!isPublicRoute(req)) await auth.protect();
  },
  () => ({
    debug: true,
    secretKey: tenantKeys.tenant1.secretKey,
    publishableKey: tenantKeys.tenant1.publishableKey,
    signInUrl: tenantKeys.tenant1.signInurl,
    signUpUrl: tenantKeys.tenant1.signUpUrl,
    domain: tenantKeys.tenant1.domain,
  })
);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
