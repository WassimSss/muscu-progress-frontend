"use client"

import useAuthClientAndRedirect from "@/app/hooks/useAuthClientAndRedirect";
import useAuthServerAndRedirect from "@/app/hooks/useAuthServerAndRedirect";
import { Button } from "@/components/ui/button";
import { MinusCircle } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useAppSelector } from "@/reducer/store";
import { toast } from "react-toastify";
import { useCallback, useEffect, useState } from "react";
import { programs } from "@/app/data";
import Link from "next/link";
export default function Page() {
  const requireAuth = true;
  const redirect = "/";
  useAuthServerAndRedirect(requireAuth, redirect);
  useAuthClientAndRedirect(requireAuth, redirect);
  const token = useAppSelector((state) => state.users.value).token;
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);


  const allPrograms = programs.map((program, i) => {
    const currentProgram = selectedProgram === program.value;
    return (
      <CarouselItem key={i}>
        <div className={`border-2 ${currentProgram ? "border-primary" : "border-gray-600"}  p-6 text-white bg-neutral-800 flex flex-col items-center justify-between`}>
          <MinusCircle size={32} />
          <p className="text-2xl">{program.title}</p>
          <p className="text-base text-gray-400 text-center">
            {program.description}
          </p>

          <Button className={`${currentProgram && "cursor-default bg-neutral-600 text-neutral-300"}`} onClick={() => handleChoseProgram(program.value)}>
            Choisir ce programme
          </Button>


        </div>
      </CarouselItem >
    );
  });

  const handleChoseProgram = async (program: string) => {
    const response = await fetch("http://localhost:3000/users/programs/choose", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        program,
      }),
    });

    const data = await response.json();

    if (data.result) {
      toast.success(data.message);
      setSelectedProgram(program);
      return;
    }
    toast.error(data.message);
  }

  const getUserProgram = useCallback(async () => {
    const response = await fetch("http://localhost:3000/users/programs/get", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (data.result) {
      setSelectedProgram(data.program);
      toast.success(data.message);
      console.log(data)
      return;
    }
    toast.error(data.message);
  }, [token])

  useEffect(() => {
    getUserProgram();
  }, [getUserProgram]);

  return (
    <main className="flex min-h-screen flex-col items-center mt-24 md:p-16 gap-6 px-4">

      <h1 className="text-4xl text-white">Programmes</h1>

      <Carousel className="w-1/2">
        <CarouselContent>
          {allPrograms}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

    </main>
  );
}