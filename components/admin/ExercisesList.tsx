"use client";

import { useAppSelector } from "@/reducer/store";
import { useState } from "react";
import SelectWithLabel from "../ui/SelectWithLabel";
import InputWithLabel from "../ui/InputWithLabel";
import { toast } from "react-toastify";
import { MuscleGroupObject } from "@/app/type";

export function ExercisesList({ className, muscleGroups }: { className?: string, muscleGroups: MuscleGroupObject[] }) {
  const token = useAppSelector(state => state.users.value).token
  const [idSelectedMuscleGroup, setIdSelectedMuscleGroup] = useState<string | null>(null)
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string | null>(null)

  const [exercises, setExercises] = useState<MuscleGroupObject[]>([])

  const handleMuscleGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectElement = event.target;
    const selectedOption = selectElement.selectedOptions[0];

    const value = selectElement.value;
    const dataText = selectedOption.getAttribute('data-text');
    console.log(value, dataText)
    if (!value) {
      setIdSelectedMuscleGroup(null);
      setSelectedMuscleGroup(null)
      return;
    }
    setIdSelectedMuscleGroup(value);
    setSelectedMuscleGroup(dataText);
  }

  const muscleGroupsOption = muscleGroups.map((muscleGroup: MuscleGroupObject) => {
    return {
      value: muscleGroup._id,
      label: muscleGroup.name
    }
  }).sort((a: any, b: any) => a.label.localeCompare(b.label))
  return (
    <div className={`bg-neutral-800 p-6 flex flex-col justify-center gap-4 rounded-xl ${className}`}>

      <p className="text-white text-xl font-bold">Liste des exercices</p>
      <SelectWithLabel label="Groupe musculaire" required={true} id="muscleGroup" name="muscleGroup" className="mb-4 text-white" option={muscleGroupsOption} onChange={handleMuscleGroupChange} text="Selectionner un groupe musculaire" />

      {selectedMuscleGroup && (
        <>
          <p className="text-primary text-lg font-bold">{selectedMuscleGroup}</p>
        </>
      )
      }

    </div>
  );
}

