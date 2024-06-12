"use client";

import { useAppSelector } from "@/reducer/store";
import useAuthClientAndRedirect from "../hooks/useAuthClientAndRedirect";
import useAuthServerAndRedirect from "../hooks/useAuthServerAndRedirect";
import { useRouter } from "next/navigation";
import InputWithLabel from "@/components/ui/InputWithLabel";
import SelectWithLabel from "@/components/ui/SelectWithLabel";
import { useCallback, useEffect, useState } from "react";
import { ExercisesObjectData, MuscleGroupObject, MuscleGroupsData } from "../type";
import { set } from "date-fns";
import { toast } from "react-toastify";

export default function Page() {
  const user = useAppSelector(state => state.users.value);
  const router = useRouter();
  const [exerciseExerciseForm, setExerciseExerciseForm] = useState<string | undefined>(undefined)
  const [muscleGroup, setMuscleGroup] = useState<string | undefined>(undefined)
  const [muscleGroups, setMuscleGroups] = useState<MuscleGroupObject[]>([])
  const token = useAppSelector(state => state.users.value).token
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string | null>(null)

  const fetchMuscleGroups = useCallback(async () => {
    const response = await fetch("http://localhost:3000/users/muscle-groups/get", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json();
    if (data.result) {
      setMuscleGroups(data.muscleGroups);
    }
  }, [token, setMuscleGroups])

  useEffect(() => {
    fetchMuscleGroups();
  }, [token, fetchMuscleGroups])
  useEffect(() => {
    fetch("http://localhost:3000/users/muscle-groups/get", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data: MuscleGroupsData) => {

        if (data.result) {
          setMuscleGroups(data.muscleGroups);
          // handleMuscleGroupChange(data.muscleGroups[0]._id)
          console.log(data)
        }
      });
  }, [token])

  // Check if user is admin
  if (!user.roles.includes("ROLE_ADMIN")) {
    router.push("/");
    return (
      <main className="flex min-h-screen flex-col mt-24 md:p-16 gap-6 px-4">
        <h1 className="text-3xl font-bold text-white">Vous n&apos;avez pas les droits pour accéder à cette page</h1>
      </main>
    )
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
      fetchMuscleGroups();
      return;
    }
    toast.error(data.message);
  }

  const muscleGroupsOption = muscleGroups.map((muscleGroup: MuscleGroupObject) => {
    return {
      value: muscleGroup._id,
      label: muscleGroup.name
    }
  }).sort((a: any, b: any) => a.label.localeCompare(b.label))

  return (
    <main className="flex min-h-screen flex-col mt-24 md:p-16 gap-6 px-4">
      <p className="text-white text-3xl font-bold">Page Admin</p>

      <div className="bg-neutral-800 p-6 flex flex-col justify-center gap-4 rounded-xl">
        <p className="text-white text-xl font-bold">Ajouter un exercice</p>
        <SelectWithLabel label="Groupe musculaire" required={true} id="muscleGroup" name="muscleGroup" className="mb-4 text-white" option={muscleGroupsOption} onChange={handleMuscleGroupChange} text="Selectionner un groupe musculaire" />
        <InputWithLabel label="Nom de l'exercice" type="text" placeholder="Nom de l'exercice" required={true} id="exerciseName" name="exerciseName" className="mb-4 text-white" minLength={0} maxLength={50} active={selectedMuscleGroup === null ? false : true} onChange={(e) => setExerciseExerciseForm(e.target.value)} value={exerciseExerciseForm} />

        <button onClick={handleSubmitExercise} className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Ajouter</button>

      </div>

      <div className="bg-neutral-800 p-6 flex flex-col justify-center gap-4 rounded-xl">
        <p className="text-white text-xl font-bold">Ajouter un groupe musculaire</p>
        <InputWithLabel label="Nom du groupe musculaire" type="text" placeholder="Nom du groupe musculaire" required={true} id="muscleGroupName" name="muscleGroupName" className="mb-4 text-white" minLength={0} maxLength={50} onChange={(e) => setMuscleGroup(e.target.value)} value={muscleGroup} />
        {/* <SelectWithLabel label="Groupe musculaire" required={true} id="muscleGroup" name="muscleGroup" className="mb-4 text-white" option={muscleGroupsOption} onChange={handleMuscleGroupChange} text="Selectionner un groupe musculaire" /> */}

        <button onClick={handleSubmitMuscleGroup} className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Ajouter</button>

      </div>
    </main>
  );
}