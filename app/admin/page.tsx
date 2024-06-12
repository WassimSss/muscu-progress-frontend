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
import { AddExercise } from "@/components/admin/addExercise";
import { AddMuscleGroup } from "@/components/admin/AddMuscleGroup";

export default function Page() {
  const user = useAppSelector(state => state.users.value);
  const router = useRouter();
  const [exerciseExerciseForm, setExerciseExerciseForm] = useState<string | undefined>(undefined)
  const [muscleGroups, setMuscleGroups] = useState<MuscleGroupObject[]>([])
  const token = useAppSelector(state => state.users.value).token

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





  return (
    <main className="flex min-h-screen flex-col mt-24 md:p-16 gap-6 px-4">
      <p className="text-white text-3xl font-bold">Page Admin</p>


      <AddExercise className="mb-4" muscleGroups={muscleGroups} />
      <AddMuscleGroup className="mb-4" fetchMuscleGroups={fetchMuscleGroups} />

    </main>
  );
}