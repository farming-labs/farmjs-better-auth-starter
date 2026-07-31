import type { LayoutProps, Metadata } from "@farm.js/core";
import "./globals.css";

export const metadata: Metadata = {
  title: "Farm.js Auth Starter",
  description: "A production-shaped starter powered by Farm.js built-in authentication.",
};

export default function RootLayout({ children }: LayoutProps) {
  return <>{children}</>;
}
