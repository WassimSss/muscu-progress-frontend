"use client";

import { cn } from "@/lib/utils";
import { disconnect } from "@/reducer/slices/usersSlice";
import { useAppSelector } from "@/reducer/store";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";

export function Header({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const user = useAppSelector(state => state.users.value);
  console.log("user : ", user)
  const dispatch = useDispatch();

  const handleDisconnect = () => {
    dispatch(disconnect());
  }

  return (
    <header
      className={cn("flex items-center justify-between bg-primary", className)}
    >
      <Link href="/" className="m-3 ">
        <p className="text-md font-bold md:text-lg text-white">MuscuProgress</p>
      </Link>

      <nav className="flex gap-3 m-3">

        {user.token ? (
          <>
            <Link href="/app">
              <p className="text-white text-sm font-bold md:text-lg">S&apos;entrainer</p>
            </Link>

            <Link href="/app/weight">
              <p className="text-white text-sm font-bold md:text-lg">Poids</p>
            </Link>

            {user.roles.includes("ROLE_ADMIN") && (
              <Link href="/admin">
                <p className="text-white text-sm font-bold md:text-lg">Admin</p>
              </Link>
            )}

            <button onClick={handleDisconnect}>
              <p className="text-white text-sm font-bold md:text-lg">Déconnexion</p>
            </button>
          </>
        ) : (
          <>
            <Link href="/login">
              <p className="text-white text-sm font-bold md:text-lg">Se connecter</p>
            </Link>

            <Link href="/register">
              <p className="text-white text-sm font-bold md:text-lg">S&apos;inscrire</p>
            </Link>
          </>
        )
        }

      </nav >


    </header >
  );
}