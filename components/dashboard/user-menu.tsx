"use client";

import { useState } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";

type UserMenuProps = {
  name: string;
  email: string;
};

export function UserMenu({ name, email }: UserMenuProps) {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const initials =
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() ||
    email[0]?.toUpperCase() ||
    "U";

  async function handleSignOut() {
    setIsSigningOut(true);

    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace("/sign-in");
          router.refresh();
        },
        onError: () => {
          setIsSigningOut(false);
        },
      },
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex items-center gap-3 rounded-xl px-2 py-1.5 text-left outline-none transition-colors hover:bg-muted/70 focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Open account menu"
      >
        <span className="flex size-8 items-center justify-center rounded-lg border border-primary/15 bg-secondary text-xs font-semibold text-primary">
          {initials}
        </span>

        <span className="hidden min-w-0 sm:block">
          <span className="block max-w-48 truncate text-sm font-medium">
            {name}
          </span>
          <span className="block max-w-48 truncate text-xs text-muted-foreground">
            {email}
          </span>
        </span>

        <ChevronDown
          className="size-4 text-muted-foreground"
          aria-hidden="true"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64 rounded-xl border-border/80 p-1.5 shadow-xl"
      >
        <DropdownMenuGroup>
  <DropdownMenuLabel className="py-2">
    <span className="block truncate text-sm font-medium text-foreground">
      {name}
    </span>
    <span className="mt-0.5 block truncate font-normal text-muted-foreground">
      {email}
    </span>
  </DropdownMenuLabel>
</DropdownMenuGroup>


        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          disabled={isSigningOut}
          onClick={handleSignOut}
        >
          <LogOut aria-hidden="true" />
          {isSigningOut ? "Signing out…" : "Sign out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
