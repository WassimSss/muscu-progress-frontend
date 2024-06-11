'use client'
import useAuthClientAndRedirect from "./hooks/useAuthClientAndRedirect";
import useAuthServerAndRedirect from "./hooks/useAuthServerAndRedirect";
import { useAppSelector } from '@/reducer/store';




export default function Home() {
  const requireAuth = false;
  const redirect = "/app"
  useAuthServerAndRedirect(requireAuth, redirect);
  useAuthClientAndRedirect(requireAuth, redirect);


  return (
    <main className="flex min-h-screen flex-col mt-24 md:p-24 gap-2 px-4">

      <h2 className="text-white text-2xl md:text-4xl lg:5xl font-bold text-center"><span className="text-primary">L’application</span> de suivie journalier
        d’exercice de <span className="text-primary">musculation</span></h2>
      <p className=" text-neutral-400 test text-sm md:text-md lg:text-lg font-bold text-center">Entrez vos exercices, vos series, vos poids, vos dates et constatez votre progression</p>


    </main>
  );
}
