import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ChevronDownIcon,
  LogOutIcon,
  SettingsIcon,
  SlidersHorizontalIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Skeleton } from "./skeleton";
import useAuth from "@/hooks/use-auth";
import { useRouter } from "@tanstack/react-router";

export default function AvatarWithDropdown() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0">
          <Avatar>
            {/* <AvatarImage src={user} alt="Profile image" /> */}
            <AvatarFallback>
              <Skeleton className="h-8 w-8 rounded-full" />
            </AvatarFallback>
          </Avatar>
          <ChevronDownIcon
            size={16}
            className="opacity-60"
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="truncate font-medium text-foreground text-sm">
            {user?.username}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* <DropdownMenuItem onClick={() => router.navigate({ to: "/profile" })}>
            <UserIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Profile</span>
          </DropdownMenuItem> */}
          <DropdownMenuItem onClick={() => router.navigate({ to: "/sliders" })}>
            <SlidersHorizontalIcon
              size={16}
              className="opacity-60"
              aria-hidden="true"
            />
            <span>My Sliders</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => router.navigate({ to: "/settings" })}
          >
            <SettingsIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem
          variant="destructive"
          onClick={() => router.navigate({ to: "/logout" })}
        >
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
