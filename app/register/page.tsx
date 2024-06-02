/* eslint-disable react/no-unescaped-entities */
"use client"

import Step1 from "@/components/Step1";
import { useState } from "react";
import useAuthServerAndRedirect from "../hooks/useAuthServerAndRedirect";
import useAuthClientAndRedirect from "../hooks/useAuthClientAndRedirect";

export default function Page() {
  const requireAuth = false;
  const redirect = "/app"

  useAuthServerAndRedirect(requireAuth, redirect);
  useAuthClientAndRedirect(requireAuth, redirect);

  const [step, setStep] = useState<string>("1");

  return (
    <main className="flex min-h-screen flex-col items-center mt-14 w-full">
      <h1 className="font-bold text-primary text-xl mb-8">S'inscrire</h1>



      {step === "1" && <Step1 />}

      {/* <StepArrow /> */}
    </main>
  );
}