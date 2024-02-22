import Header from "@/components/Header";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WeMovies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header/>
        {children}
      </body>
    </html>
  );
}
