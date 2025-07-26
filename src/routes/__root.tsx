import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  HeadContent,
  Link,
  Outlet,
  createRootRouteWithContext,
  redirect,
} from "@tanstack/react-router";
import { MenuIcon, XIcon } from "lucide-react";

import AvatarWithDropdown from "@/components/ui-custom/avatar-with-dropdown";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";
import Loader from "@/components/ui-custom/loader";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { TopProgress } from "@/components/ui-custom/top-loader";
import useAuth from "@/hooks/use-auth";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

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
    // <div className="flex-grow grid place-items-center">
    //   <Loader />
    // </div>
    <TopProgress />
  ),
  errorComponent: (e) => {
    return (
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Error</h1>
          <p>{e.error.message}</p>
        </div>
      </div>
    );
  },
});

const activeClass = "underline";

function RootComponent() {
  const { isAuthenticated } = useAuth();
  const isMobile = useIsMobile();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <HeadContent />
      <div className="flex min-h-[100dvh] max-w-[100dvw] flex-col bg-background">
        <header className="flex items-center justify-around border-b border-b-border bg-container-1 p-4 text-foreground">
          <Link to="/" className="font-bold text-2xl">
            SoulsForge
          </Link>
          <div className="flex items-center justify-center">
            {isMobile ? (
              <>
                <Drawer
                  direction="right"
                  open={mobileMenuOpen}
                  onClose={() => setMobileMenuOpen(false)}
                  onOpenChange={setMobileMenuOpen}
                >
                  <DrawerTrigger asChild>
                    <Button variant="ghost" aria-label="Open Menu">
                      <MenuIcon className="size-6" />
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DialogTitle className="flex items-center justify-between">
                        <Link to="/" className="font-bold text-2xl">
                          SoulsForge
                        </Link>
                        <Button
                          variant="ghost"
                          aria-label="Close Menu"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <XIcon />
                        </Button>
                      </DialogTitle>
                    </DrawerHeader>
                    <nav className="flex flex-col items-start justify-start space-y-2 p-4">
                      <Button asChild variant="link">
                        <Link
                          to="/search"
                          activeProps={{ className: activeClass }}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Search
                        </Link>
                      </Button>
                      {isAuthenticated ? (
                        <Button asChild variant="link">
                          <Link
                            to="/create"
                            activeProps={{ className: activeClass }}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Create
                          </Link>
                        </Button>
                      ) : (
                        <>
                          <Button asChild variant="link">
                            <Link
                              to="/login"
                              activeProps={{ className: activeClass }}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              Login
                            </Link>
                          </Button>
                          <Button asChild variant="link">
                            <Link
                              to="/register"
                              activeProps={{ className: activeClass }}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              Register
                            </Link>
                          </Button>
                        </>
                      )}
                    </nav>
                  </DrawerContent>
                </Drawer>
              </>
            ) : (
              <>
                <nav className="flex">
                  <ul className="flex space-x-1">
                    <Button asChild variant="link">
                      <Link
                        to="/search"
                        activeProps={{ className: activeClass }}
                      >
                        Search
                      </Link>
                    </Button>
                    {isAuthenticated && (
                      <Button asChild variant="link">
                        <Link
                          to="/create"
                          activeProps={{ className: activeClass }}
                        >
                          Create
                        </Link>
                      </Button>
                    )}
                  </ul>
                </nav>
              </>
            )}
            {isAuthenticated ? (
              <AvatarWithDropdown />
            ) : (
              <>
                {!isMobile && (
                  <>
                    <Button variant="secondary" className="ml-4" asChild>
                      <Link to="/login">Login</Link>
                    </Button>

                    <Button variant="default" className="ml-4" asChild>
                      <Link to="/register">Register</Link>
                    </Button>
                  </>
                )}
              </>
            )}
          </div>
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
