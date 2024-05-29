"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

export function Header({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  return (
    <header
      className={cn("flex items-center justify-between bg-primary", className)}
    >
      <Link href="/" className="m-3 ">
        <p className="text-md font-bold md:text-lg text-white">MuscuProgress</p>
      </Link>

      <nav className="flex gap-3 m-3">

        {isConnected ? (
          <>
            <Link href="/app">
              <p className="text-white text-sm font-bold md:text-lg">S'entrainer</p>
            </Link>

            <Link href="/profil">
              <p className="text-white text-sm font-bold md:text-lg">Profil</p>
            </Link>

            <Link href="/">
              <p className="text-white text-sm font-bold md:text-lg">Déconnexion</p>
            </Link>
          </>
        ) : (
          <>
            <Link href="/login">
              <p className="text-white text-sm font-bold md:text-lg">Se connecter</p>
            </Link>

            <Link href="/register">
              <p className="text-white text-sm font-bold md:text-lg">S'inscrire</p>
            </Link>
          </>
        )
        }

      </nav >


    </header >
  );
}