import { Layout } from "@/components";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      {}
      <head />
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
