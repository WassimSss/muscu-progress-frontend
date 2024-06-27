"use client";

import { cn } from "@/lib/utils";
import { disconnect } from "@/reducer/slices/usersSlice";
import { useAppSelector } from "@/reducer/store";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import SelectWithLabel from "../ui/SelectWithLabel";
import InputWithLabel from "../ui/InputWithLabel";
import { toast } from "react-toastify";
import { MuscleGroupObject } from "@/app/type";

export function AddMuscleGroup({ className, fetchMuscleGroups }: { className?: string, fetchMuscleGroups: () => void }) {
  const token = useAppSelector(state => state.users.value).token
  const [muscleGroup, setMuscleGroup] = useState<string | undefined>(undefined)

  const handleSubmitMuscleGroup = async () => {
    if (!muscleGroup) {
      toast.error("Veuillez entrer un nom de groupe musculaire")
      return;
    }

    const response = await fetch("http://localhost:3000/admin/data-app/muscle-group/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: muscleGroup
      })
    })

    const data = await response.json();

    if (data.result) {
      toast.success(data.message)
      setMuscleGroup("");
      fetchMuscleGroups();
      return;
    }
    toast.error(data.message);
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmitMuscleGroup();
    }
  }

  return (
    <div className={`bg-neutral-800 p-6 flex flex-col justify-between gap-4 rounded-xl ${className}`}>
      <p className="text-white text-xl font-bold">Ajouter un groupe musculaire</p>
      <InputWithLabel label="Nom du groupe musculaire" type="text" placeholder="Nom du groupe musculaire" required={true} id="muscleGroupName" name="muscleGroupName" className="mb-4 text-white" minLength={0} maxLength={50} onChange={(e) => setMuscleGroup(e.target.value)} value={muscleGroup} handleKeyPress={handleKeyPress} />
      {/* <SelectWithLabel label="Groupe musculaire" required={true} id="muscleGroup" name="muscleGroup" className="mb-4 text-white" option={muscleGroupsOption} onChange={handleMuscleGroupChange} text="Selectionner un groupe musculaire" /> */}

      <button onClick={handleSubmitMuscleGroup} className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Ajouter</button>

    </div>
  );
}



