import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import { SignOutButton } from "@/components/auth/sign-out-button";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <p>Welcome, {session.user.name}.</p>
      <p>{session.user.email}</p>
      <SignOutButton />
    </main>
  );
}