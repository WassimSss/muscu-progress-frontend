/* eslint-disable react/no-unescaped-entities */
"use client"

import Step1 from "@/components/registerStep/Step1";
import Step2 from "@/components/registerStep/Step2";

import { useState } from "react";
import useAuthServerAndRedirect from "../hooks/useAuthServerAndRedirect";
import useAuthClientAndRedirect from "../hooks/useAuthClientAndRedirect";

export default function Page() {
  const requireAuth = false;
  const redirect = "/app"

  useAuthServerAndRedirect(requireAuth, redirect);
  useAuthClientAndRedirect(requireAuth, redirect);

  const [step, setStep] = useState<string>("1");


  const handleStep = (step: string) => {
    setStep(step);
  }

  return (
    <main className="flex min-h-screen flex-col items-center mt-14 w-full">
      <h1 className="font-bold text-primary text-xl mb-8">S'inscrire</h1>



      {step === "1" && <Step2 handleStep={handleStep} />}
      {step === "2" && <Step2 handleStep={handleStep} />}

      {/* <StepArrow /> */}
    </main>
  );
}