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
export default function Page() {
  const requireAuth = true;
  const redirect = "/";
  useAuthServerAndRedirect(requireAuth, redirect);
  useAuthClientAndRedirect(requireAuth, redirect);

  return (
    <main className="flex min-h-screen flex-col items-center mt-24 md:p-16 gap-6 px-4">


      <Carousel className="w-1/2">
        <CarouselContent>
          <CarouselItem>      <div className="border-2 border-gray-600 p-6 text-white bg-neutral-800 flex flex-col items-center justify-between">
            <MinusCircle size={32} />
            <p className="text-2xl">Prise de masse</p>
            <p className="text-base text-gray-400 text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
              pariatur voluptate quisquam voluptatibus placeat? Exercitationem
              incidunt quo asperiores excepturi fugit voluptatibus neque, nesciunt
              nulla doloremque deleniti expedita necessitatibus nobis itaque!
            </p>
            <Button className="bg-primary text-white p-2 rounded-lg">
              Choisir ce programme
            </Button>
          </div></CarouselItem>
          <CarouselItem>      <div className="border-2 border-gray-600 p-6 text-white bg-neutral-800 flex flex-col items-center justify-between">
            <MinusCircle size={32} />
            <p className="text-2xl">Prise de masse</p>
            <p className="text-base text-gray-400 text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
              pariatur voluptate quisquam voluptatibus placeat? Exercitationem
              incidunt quo asperiores excepturi fugit voluptatibus neque, nesciunt
              nulla doloremque deleniti expedita necessitatibus nobis itaque!
            </p>
            <Button className="bg-primary text-white p-2 rounded-lg">
              Choisir ce programme
            </Button>
          </div></CarouselItem>
          <CarouselItem>      <div className="border-2 border-gray-600 p-6 text-white bg-neutral-800 flex flex-col items-center justify-between">
            <MinusCircle size={32} />
            <p className="text-2xl">Prise de masse</p>
            <p className="text-base text-gray-400 text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
              pariatur voluptate quisquam voluptatibus placeat? Exercitationem
              incidunt quo asperiores excepturi fugit voluptatibus neque, nesciunt
              nulla doloremque deleniti expedita necessitatibus nobis itaque!
            </p>
            <Button className="bg-primary text-white p-2 rounded-lg">
              Choisir ce programme
            </Button>
          </div></CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </main>
  );
}