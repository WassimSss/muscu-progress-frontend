import Header from "@/components/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MuscuProgress",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="fr">
      <head>
        {/* <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css" rel="stylesheet" /> */}

      </head>
      <body className={inter.className}>
        <Header />

        {children}

        <script src="https://cdn.lordicon.com/lordicon.js"></script>
      </body>
    </html>
  );
}
