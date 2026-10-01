import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Review change request",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

export default function ApprovalLayout({ children }: LayoutProps<"/approve">) {
  return children;
}
