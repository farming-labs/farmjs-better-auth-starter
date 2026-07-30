import type { LayoutProps, Metadata } from "@farm.js/core";
import "./globals.css";

export const metadata: Metadata = {
  title: "Farm.js Better Auth Starter",
  description: "A production-shaped Farm.js authentication starter powered by Better Auth.",
};

export default function RootLayout({ children }: LayoutProps) {
  return <>{children}</>;
}
