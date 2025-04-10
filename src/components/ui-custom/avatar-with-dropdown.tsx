import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChevronDownIcon,
  LogOutIcon,
  SettingsIcon,
  SlidersHorizontalIcon,
  UserIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import useAuth from "@/hooks/use-auth";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";

export default function AvatarWithDropdown() {
  const { user } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>();

  return (
    <DropdownMenu onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0">
          <Avatar>
            <AvatarImage src={user?.profile.avatar} alt="Profile image" />
            <AvatarFallback>
              <Skeleton className="size-8 rounded-full" />
            </AvatarFallback>
          </Avatar>
          <ChevronDownIcon
            size={16}
            className={cn(
              "opacity-60 transition-transform",
              open && "rotate-180",
            )}
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() =>
              router.navigate({
                to: "/$username",
                params: { username: user!.username },
              })
            }
          >
            <UserIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>My Profile</span>
          </DropdownMenuItem>
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
