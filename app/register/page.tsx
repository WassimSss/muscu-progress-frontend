/* eslint-disable react/no-unescaped-entities */
"use client"

import Step1 from "@/components/Step1";
import { useState } from "react";

export default function Page() {
  const [step, setStep] = useState<string>("1");

  const handleChangeStep = (step: string) => {
    setStep(step);
  }

  return (
    <main className="flex min-h-screen flex-col items-center mt-14 w-full">
      <h1 className="font-bold text-primary text-xl mb-8">S'inscrire</h1>



      {step === "1" && <Step1 handleChangeStep={handleChangeStep} />}

      {/* <StepArrow /> */}
    </main>
  );
}