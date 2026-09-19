import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";

export default function SignInPage() {
  return (
    <main>
      <h1>Sign in to ScopeAprove</h1>
      <p>Continue with your Google account.</p>
      <GoogleSignInButton />
    </main>
  );
}