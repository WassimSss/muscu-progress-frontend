"use client"

import useAuthClientAndRedirect from "@/app/hooks/useAuthClientAndRedirect";
import useAuthServerAndRedirect from "@/app/hooks/useAuthServerAndRedirect";
import CalculCaloric from "@/components/ui/CalculCaloric";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function Page() {
  const requireAuth = true;
  const redirect = "/"
  useAuthServerAndRedirect(requireAuth, redirect);
  useAuthClientAndRedirect(requireAuth, redirect);

  return (
    <main className="flex min-h-screen flex-col items-center mt-24 md:p-16 gap-6 px-4" >
      <h1 className="text-3xl font-bold text-white">Calories</h1>


      <div >
        <CalculCaloric className="text-white" />
      </div>

    </main>
  )
}