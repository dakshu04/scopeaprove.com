"use client";

import { authClient } from "@/lib/auth-client";

export function GoogleSignInButton() {
  async function handleSignIn() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  }

  return (
    <button type="button" onClick={handleSignIn}>
      Continue with Google
    </button>
  );
}