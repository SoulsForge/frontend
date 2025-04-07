import * as React from "react";

import {
  HeadContent,
  Link,
  Outlet,
  createRootRouteWithContext,
  redirect,
} from "@tanstack/react-router";

import AvatarWithDropdown from "@/components/ui/avatar-with-dropdown";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/use-auth";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Loader2Icon } from "lucide-react";

type RouterContext = {
  authentication: ReturnType<typeof useAuth>;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        title: "SoulsForge",
      },
    ],
  }),
  component: RootComponent,
  beforeLoad: async ({ context }) => {
    // verify user if token exists
    const { verify } = context.authentication;

    try {
      await verify();
    } catch (error) {
      console.error("User verification failed:", error);
      throw redirect({ to: "/login" });
    }
  },
  pendingComponent: () => (
    <div className="flex h-screen items-center justify-center">
      <Loader2Icon className="animate-spin" />
    </div>
  ),
});

const activeClass = "underline";

function RootComponent() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <HeadContent />
      <div className="flex min-h-[100dvh] max-w-[100dvw] flex-col bg-background">
        <header className="flex items-center justify-around border-b border-b-border bg-container-1 p-4 text-foreground">
          <Link to="/" className="font-bold text-2xl">
            SoulsForge
          </Link>
          <nav className="flex">
            <ul className="flex space-x-1">
              <Button asChild variant="link">
                <Link to="/search" activeProps={{ className: activeClass }}>
                  Search
                </Link>
              </Button>
              {isAuthenticated && (
                <Button asChild variant="link">
                  <Link to="/create" activeProps={{ className: activeClass }}>
                    Create
                  </Link>
                </Button>
              )}
            </ul>
            {isAuthenticated ? (
              <AvatarWithDropdown />
            ) : (
              <>
                <Button variant="secondary" className="ml-4" asChild>
                  <Link to="/login">Login</Link>
                </Button>

                <Button variant="default" className="ml-4" asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </>
            )}
          </nav>
        </header>

        <main className="mx-auto flex w-full max-w-5xl flex-grow flex-col items-stretch justify-stretch px-8 py-4 text-foreground ">
          <Outlet />
        </main>

        <footer className="flex items-center justify-center border-t border-t-border bg-background p-4 text-foreground">
          <p>&copy; {new Date().getFullYear()} SoulsForge</p>
        </footer>
      </div>
      <TanStackRouterDevtools />
    </>
  );
}
