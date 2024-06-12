"use client";

import { useAppSelector } from "@/reducer/store";
import { useState } from "react";
import SelectWithLabel from "../ui/SelectWithLabel";
import InputWithLabel from "../ui/InputWithLabel";
import { toast } from "react-toastify";
import { MuscleGroupObject } from "@/app/type";

export function AddExercise({ className, muscleGroups }: { className?: string, muscleGroups: MuscleGroupObject[] }) {
  const token = useAppSelector(state => state.users.value).token
  const [exerciseExerciseForm, setExerciseExerciseForm] = useState<string | undefined>(undefined)
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string | null>(null)

  const handleSubmitExercise = async () => {
    if (!selectedMuscleGroup) {
      toast.error("Veuillez selectionner un groupe musculaire")
      return;
    }
    console.log("exerciseExerciseForm : ", exerciseExerciseForm)
    if (!exerciseExerciseForm) {
      toast.error("Veuillez entrer un nom d'exercice")
      return;
    }

    const response = await fetch("http://localhost:3000/admin/data-app/exercise/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: exerciseExerciseForm,
        idMuscleGroup: selectedMuscleGroup
      })
    })
    const data = await response.json();

    if (data.result) {
      toast.success(data.message)
      return;
    }
    toast.error(data.message);
  }

  const handleMuscleGroupChange = (value: string) => {
    if (!value) {
      setSelectedMuscleGroup(null);
      return;
    }
    setSelectedMuscleGroup(value);
    console.log(value)
    setExerciseExerciseForm("");
  }

  const muscleGroupsOption = muscleGroups.map((muscleGroup: MuscleGroupObject) => {
    return {
      value: muscleGroup._id,
      label: muscleGroup.name
    }
  }).sort((a: any, b: any) => a.label.localeCompare(b.label))

  return (
    <div className={`bg-neutral-800 p-6 flex flex-col justify-center gap-4 rounded-xl ${className}`}>
      <p className="text-white text-xl font-bold">Ajouter un exercice</p>
      <SelectWithLabel label="Groupe musculaire" required={true} id="muscleGroup" name="muscleGroup" className="mb-4 text-white" option={muscleGroupsOption} onChange={handleMuscleGroupChange} text="Selectionner un groupe musculaire" />
      <InputWithLabel label="Nom de l'exercice" type="text" placeholder="Nom de l'exercice" required={true} id="exerciseName" name="exerciseName" className="mb-4 text-white" minLength={0} maxLength={50} active={selectedMuscleGroup === null ? false : true} onChange={(e) => setExerciseExerciseForm(e.target.value)} value={exerciseExerciseForm} />

      <button onClick={handleSubmitExercise} className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Ajouter</button>

    </div>
  );
}

