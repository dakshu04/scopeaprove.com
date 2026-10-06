import type { Metadata } from "next";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Clock3,
  FileCheck2,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your ScopeYes workspace.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

const trustPoints = [
  { icon: ShieldCheck, label: "Private workspace" },
  { icon: LockKeyhole, label: "Secure Google sign-in" },
  { icon: Clock3, label: "Ready in seconds" },
];

export default async function SignInPage({
  searchParams,
}: PageProps<"/sign-in">) {
  const params = await searchParams;
  const callbackURL =
    params.next === "checkout" ? "/checkout/start" : "/dashboard";

  return (
    <main className="relative min-h-dvh overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(213,235,225,0.72),transparent_34%),linear-gradient(180deg,#fafbf9_0%,#f1f5f2_100%)] text-foreground">
      <header className="relative z-20 h-16 border-b border-border/70 bg-white/65 backdrop-blur-xl">
        <div className="mx-auto flex h-full max-w-[1180px] items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="group flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="grid size-8 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground shadow-[0_6px_16px_rgba(23,107,85,0.2)] transition-transform group-hover:-translate-y-0.5">
              S
            </span>
            <span className="text-sm font-semibold tracking-[-0.02em]">
              ScopeYes
            </span>
          </Link>

          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium text-muted-foreground outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft
              className="size-3.5 transition-transform group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
            Back to home
          </Link>
        </div>
      </header>

      <section className="relative z-10 flex min-h-[calc(100dvh-4rem)] items-center justify-center px-4 py-5 sm:px-6 sm:py-8">
        <div
          className="pointer-events-none absolute -left-24 top-20 size-72 rounded-full bg-[#cce5da]/40 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-28 bottom-10 size-80 rounded-full bg-[#f0dcae]/25 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative grid w-full max-w-[1040px] overflow-hidden rounded-[1.75rem] border border-white/80 bg-white shadow-[0_32px_90px_rgba(26,52,43,0.13)] lg:min-h-[600px] lg:grid-cols-[1.05fr_0.95fr]">
          <aside className="relative hidden overflow-hidden bg-[#173d32] p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-[#62b394]/20 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#b8e4d2]">
                <Sparkles className="size-3" aria-hidden="true" />
                Better client work
              </div>

              <h1 className="mt-6 max-w-md text-[2.65rem] font-semibold leading-[1.04] tracking-[-0.05em]">
                Clear scope.
                <br />
                <span className="font-[family-name:var(--font-editorial)] font-normal italic text-[#a9e5cc]">
                  Confident approvals.
                </span>
              </h1>

              <p className="mt-5 max-w-md text-sm leading-6 text-white/62">
                Keep every change, cost, and client decision documented before
                extra work begins.
              </p>
            </div>

            <div className="relative my-8 rounded-2xl border border-white/10 bg-white/[0.07] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.16)] backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/45">
                    Change request
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    Analytics dashboard
                  </p>
                </div>
                <span className="rounded-full bg-[#a9e5cc] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-[#173d32]">
                  Ready to review
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 py-4">
                <div className="rounded-xl bg-black/10 p-3">
                  <p className="text-[9px] uppercase tracking-[0.12em] text-white/45">
                    Additional cost
                  </p>
                  <p className="mt-1 text-lg font-semibold">$750</p>
                </div>
                <div className="rounded-xl bg-black/10 p-3">
                  <p className="text-[9px] uppercase tracking-[0.12em] text-white/45">
                    Timeline
                  </p>
                  <p className="mt-1 text-lg font-semibold">+5 days</p>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-[#a9e5cc]/15 bg-[#a9e5cc]/10 px-3.5 py-3">
                <span className="flex items-center gap-2 text-xs text-[#d8f4e8]">
                  <FileCheck2 className="size-4" aria-hidden="true" />
                  Client decision recorded
                </span>
                <CheckCircle2
                  className="size-4 text-[#a9e5cc]"
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="relative flex flex-wrap gap-x-5 gap-y-2 text-[10px] text-white/52">
              {["Clear scope", "Recorded decisions", "Protected margins"].map(
                (item) => (
                  <span className="flex items-center gap-1.5" key={item}>
                    <Check className="size-3 text-[#a9e5cc]" aria-hidden="true" />
                    {item}
                  </span>
                ),
              )}
            </div>
          </aside>

          <section className="flex flex-col justify-center px-5 py-8 sm:px-10 sm:py-10 lg:px-12">
            <div className="mx-auto w-full max-w-[390px]">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-secondary/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary lg:hidden">
                <Sparkles className="size-3" aria-hidden="true" />
                Clear scope. Confident approvals.
              </div>

              <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-primary">
                Welcome to ScopeYes
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.045em] text-[#18231f] sm:text-[2.4rem]">
                Welcome back.
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Continue with Google to manage your projects, scope changes, and
                client approvals.
              </p>

              <div className="mt-7 rounded-2xl border border-border/80 bg-[#fbfcfb] p-2 shadow-[0_12px_32px_rgba(31,49,42,0.06)]">
                <GoogleSignInButton callbackURL={callbackURL} />
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">
                {trustPoints.map((point) => {
                  const Icon = point.icon;

                  return (
                    <div
                      key={point.label}
                      className="flex min-w-0 flex-col items-center gap-1.5 rounded-xl border border-border/60 bg-white px-2 py-3 text-center"
                    >
                      <span className="grid size-7 place-items-center rounded-lg bg-secondary text-primary">
                        <Icon className="size-3.5" aria-hidden="true" />
                      </span>
                      <span className="text-[9px] font-medium leading-3 text-muted-foreground">
                        {point.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 border-t border-border/70 pt-5">
                <p className="text-center text-xs leading-5 text-muted-foreground">
                  New to ScopeYes? Your free workspace is created automatically
                  when you continue.
                </p>
                <p className="mt-4 text-center text-[10px] leading-5 text-muted-foreground">
                  By continuing, you agree to our{" "}
                  <Link
                    href="/terms"
                    className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary"
                  >
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
