import { Header } from "@/components/Header";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Signika } from "next/font/google";

import "./globals.css";
import dynamic from "next/dynamic";

const ReduxProvider = dynamic(() => import("./StoreProvider"), {
  ssr: false
});

const signika = Signika({
  subsets: ["latin"],
})
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
      <body
        className={cn(
          "min-h-screen bg-[#121212] font-sans antialiased",
        )}
      >
        <ReduxProvider>
          <main className={signika.className}>
            <Header />
            {children}
          </main>
        </ReduxProvider>

      </body>
    </html >
  );
}
