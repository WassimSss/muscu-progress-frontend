"use client";

import { useAppSelector } from "@/reducer/store";
import { useState } from "react";
import SelectWithLabel from "../ui/SelectWithLabel";
import InputWithLabel from "../ui/InputWithLabel";
import { toast } from "react-toastify";
import { MuscleGroupObject } from "@/app/type";
import { Trash } from "lucide-react";

export function MuscleGroupList({ className, muscleGroups, fetchMuscleGroups }: { className?: string, muscleGroups: MuscleGroupObject[], fetchMuscleGroups: () => void }) {
  const token = useAppSelector(state => state.users.value).token
  const [idSelectedMuscleGroup, setIdSelectedMuscleGroup] = useState<string | null>(null)
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string | null>(null)

  console.log("muscleGroups : ", muscleGroups)
  const deleteExercise = async (idExercise: string) => {
    console.log(idExercise, `https://muscu-progress-backend.vercel.app/admin/data-app/exercise/delete/${idExercise}`)
    const response = await fetch(`https://muscu-progress-backend.vercel.app/admin/data-app/muscle-group/delete/${idExercise}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await response.json()
    if (data.result) {
      toast.success(data.message)
      fetchMuscleGroups();
      return;
    }
    toast.error(data.message)

  }

  const allMuscleGroups = muscleGroups.map((muscleGroup: MuscleGroupObject) => {
    console.log(muscleGroup)

    return (
      <div key={muscleGroup._id} className="flex justify-between gap-4 m-4">

        <p key={muscleGroup._id} className="text-white">{muscleGroup.name}</p>
        <Trash className="text-red-500 hover:text-red-700 transition-colors cursor-pointer" onClick={() => deleteExercise(muscleGroup._id)} />

      </div>
    )
  })

  return (
    <div className={`bg-neutral-800 p-6 flex flex-col justify-center gap-4 rounded-xl ${className}`}>

      <p className="text-white text-xl font-bold">Liste des groupes musculaires</p>



      <p className="text-primary text-lg font-bold">{selectedMuscleGroup}</p>
      <div className="scroll-container">
        {allMuscleGroups}
      </div>


    </div>
  );
}

