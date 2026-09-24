import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-[#f8f8f5] text-[#202320]">
      {/* Header */}
      <header className="border-b border-[#e5e5df] bg-[#f8f8f5]">
        <div className="mx-auto flex h-[78px] max-w-[1200px] items-center justify-between px-6">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-5 w-5 items-center justify-center bg-[#176f5c] text-white">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" />
                <path d="M14 3v6h6" />
                <path d="m9 14 3 3 5-5" />
              </svg>
            </div>

            <span className="text-[15px] font-semibold tracking-[-0.02em]">
              ScopeAprove
            </span>
          </a>

          <a
            href="/"
            className="text-[14px] font-medium text-[#666963] transition-colors hover:text-[#176f5c]"
          >
            Back to home
          </a>
        </div>
      </header>

      {/* Main */}
      <section className="relative flex min-h-[calc(100vh-78px)] items-center justify-center overflow-hidden px-6 py-16">
        {/* Subtle green glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#176f5c]/[0.045] blur-[100px]" />

        <div className="relative w-full max-w-[440px]">
          {/* Small eyebrow */}
          <div className="mb-7 flex justify-center">
            <div className="inline-flex items-center gap-2 border border-[#cfe2dc] bg-[#eef6f3] px-4 py-2 text-[13px] font-medium text-[#176f5c]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#176f5c]" />
              Scope changes, properly approved.
            </div>
          </div>

          {/* Heading */}
          <div className="text-center">
            <h1 className="text-[42px] font-semibold leading-[1.05] tracking-[-0.045em] text-[#171917]">
              Welcome back.
            </h1>

            <p className="mx-auto mt-4 max-w-[350px] text-[16px] leading-7 text-[#6d706b]">
              Sign in to manage your projects, scope changes, and client
              approvals.
            </p>
          </div>

          {/* Auth box */}
          <div className="mt-9 border border-[#dedfd9] bg-white p-7 shadow-[0_18px_50px_rgba(32,35,32,0.06)]">
            <GoogleSignInButton />

            <div className="mt-5 flex items-center justify-center gap-2 text-[12px] text-[#8a8d87]">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect x="5" y="11" width="14" height="10" rx="2" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" />
              </svg>

              Secure authentication with Google
            </div>
          </div>

          {/* Footer copy */}
          <p className="mt-7 text-center text-[12px] leading-5 text-[#8a8d87]">
            By continuing, you agree to our{" "}
            <a
              href="/terms"
              className="text-[#666963] underline underline-offset-4 hover:text-[#176f5c]"
            >
              Terms
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="text-[#666963] underline underline-offset-4 hover:text-[#176f5c]"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}