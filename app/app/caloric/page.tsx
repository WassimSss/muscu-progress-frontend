"use client"

import useAuthClientAndRedirect from "@/app/hooks/useAuthClientAndRedirect";
import useAuthServerAndRedirect from "@/app/hooks/useAuthServerAndRedirect";
import CalculCaloric from "@/components/ui/CalculCaloric";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useAppSelector } from "@/reducer/store";
import { useCallback, useEffect, useState } from "react";

export default function Page() {
  const requireAuth = true;
  const redirect = "/"
  useAuthServerAndRedirect(requireAuth, redirect);
  useAuthClientAndRedirect(requireAuth, redirect);

  const [caloricNeeds, setCaloricNeeds] = useState<number | null>(null)
  const token = useAppSelector(state => state.users.value).token;

  const getCaloricNeeds = useCallback(async () => {
    const response = await fetch("https://muscu-progress-backend.vercel.app/users/calories/needs/get-last", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log("needsCAloric ", data);

    setCaloricNeeds(data.caloricNeeds);
  }, [token])

  useEffect(() => {
    getCaloricNeeds();
  }, [getCaloricNeeds])

  return (
    <main className="flex min-h-screen flex-col items-center mt-24 md:p-16 gap-6 px-4" >
      <h1 className="text-3xl font-bold text-white">Calories</h1>


      <div >
        <CalculCaloric className="text-white" />

      </div>
      <p className="text-white text-center">Votre besoin calorique est de : <span className="text-primary">{caloricNeeds}/kcal </span> par jour </p>

    </main>
  )
}