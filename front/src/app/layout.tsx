import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["200", "400", "500", "600", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Convert Images",
  description: "Convert images",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
