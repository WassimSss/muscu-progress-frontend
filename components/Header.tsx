"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

export function Header({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <header
      className={cn("flex items-center justify-between bg-primary", className)}
    >
      <Link href="/" className="m-3 ">
        <p className="text-md font-bold md:text-lg text-white">MuscuProgress</p>
      </Link>

      <nav className="flex gap-3 m-3">

        <Link href="/login">
          <p className="text-white text-sm font-bold md:text-lg">Se connecter</p>
        </Link>

        <Link href="/register">
          <p className="text-white text-sm font-bold md:text-lg">S'inscrire</p>
        </Link>
      </nav>


    </header>
  );
}