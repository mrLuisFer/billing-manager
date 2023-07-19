import "./globals.css";
import type { Metadata } from "next";
import LayoutProvider from "@/components/LayoutProvider";
import buildMetadata from "@/helper/buildMetadata";

export const metadata: Metadata = buildMetadata({
  title: "Home",
  description: "Home page",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutProvider>{children}</LayoutProvider>;
}
