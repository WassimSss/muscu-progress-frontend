"use client";

import { useAppSelector } from "@/reducer/store";
import { useCallback, useEffect, useState } from "react";
import SelectWithLabel from "../ui/SelectWithLabel";
import InputWithLabel from "../ui/InputWithLabel";
import { toast } from "react-toastify";
import { MuscleGroupObject } from "@/app/type";
import { Trash } from "lucide-react";

export function ExercisesList({ className, muscleGroups, refreshExercises }: { className?: string, muscleGroups: MuscleGroupObject[], refreshExercises: boolean }) {
  const token = useAppSelector(state => state.users.value).token
  const [idSelectedMuscleGroup, setIdSelectedMuscleGroup] = useState<string | null>(null)
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string | null>(null)
  const [exercises, setExercises] = useState<MuscleGroupObject[]>([])

  const fetchExercises = useCallback(async (idMuscleGroup: string) => {
    const response = await fetch(`http://localhost:8080/users/exercises/get/${idMuscleGroup}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await response.json()
    console.log("data : ", data)
    if (data.result) {
      setExercises(data.exercises)
    }
  }, [token, setExercises])

  useEffect(() => {
    if (idSelectedMuscleGroup !== null) {
      fetchExercises(idSelectedMuscleGroup)
    }
  }, [refreshExercises, fetchExercises, idSelectedMuscleGroup])



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
    console.log("idSelectedMuscleGroup : ", idSelectedMuscleGroup)
    fetchExercises(value)
  }

  const deleteExercise = async (idExercise: string) => {
    console.log(idExercise, `http://localhost:8080/admin/data-app/exercise/delete/${idExercise}`)
    const response = await fetch(`http://localhost:8080/admin/data-app/exercise/delete/${idExercise}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await response.json()
    if (data.result) {
      toast.success(data.message)
      if (idSelectedMuscleGroup !== null) {
        fetchExercises(idSelectedMuscleGroup);
      }
      return;
    }
    toast.error(data.message)

  }

  const muscleGroupsOption = muscleGroups.map((muscleGroup: MuscleGroupObject) => {
    return {
      value: muscleGroup._id,
      label: muscleGroup.name
    }
  }).sort((a: any, b: any) => a.label.localeCompare(b.label))

  const allExercises = exercises.map((exercise: MuscleGroupObject) => {
    console.log(exercise)

    return (
      <div key={exercise._id} className="flex justify-between gap-4 m-4">

        <p key={exercise._id} className="text-white">{exercise.name}</p>
        <Trash className="text-red-500 hover:text-red-700 transition-colors cursor-pointer" onClick={() => deleteExercise(exercise._id)} />

      </div>
    )
  })

  console.log("exercises : ", exercises)
  return (
    <div className={`bg-neutral-800 p-6 flex flex-col gap-4 rounded-xl ${className}`}>

      <p className="text-white text-xl font-bold">Liste des exercices</p>
      <SelectWithLabel label="Groupe musculaire" required={true} id="muscleGroup" name="muscleGroup" className="mb-4 text-white" option={muscleGroupsOption} onChange={handleMuscleGroupChange} text="Selectionner un groupe musculaire" />

      {selectedMuscleGroup && (
        <>
          <p className="text-primary text-lg font-bold">{selectedMuscleGroup}</p>
          <div className="scroll-container">
            {exercises.length === 0 ? <p className="text-white">Pas d&apos;exercices</p> : allExercises}
          </div>
        </>
      )
      }

    </div>
  );
}

