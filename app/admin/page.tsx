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
import { AddExercise } from "@/components/admin/AddExercise";
import { AddMuscleGroup } from "@/components/admin/AddMuscleGroup";
import { ExercisesList } from "@/components/admin/ExercisesList";
import { MuscleGroupList } from "@/components/admin/MuscleGroupList";

export default function Page() {
  const user = useAppSelector(state => state.users.value);
  const router = useRouter();
  const [exerciseExerciseForm, setExerciseExerciseForm] = useState<string | undefined>(undefined)
  const [refreshExercises, setRefreshExercises] = useState<boolean>(false)
  const [muscleGroups, setMuscleGroups] = useState<MuscleGroupObject[]>([])
  const token = useAppSelector(state => state.users.value).token

  const fetchMuscleGroups = useCallback(async () => {
    const response = await fetch("https://muscu-progress-backend.vercel.app/users/muscle-groups/get", {
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
    fetch("https://muscu-progress-backend.vercel.app/users/muscle-groups/get", {
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

  const handleRefreshExercisesList = () => {
    setRefreshExercises(!refreshExercises);
  }




  return (
    <main className="flex min-h-screen flex-col mt-24 md:p-16 gap-6 px-4">
      <p className="text-white text-3xl font-bold">Page Admin</p>

      <div className="gap-4 md:flex md:gap-x-4">
        <MuscleGroupList className="my-4 md:w-1/2 md:my-0 max-h-96" muscleGroups={muscleGroups} fetchMuscleGroups={fetchMuscleGroups} />
        <ExercisesList className="my-4 md:w-1/2 md:my-0 max-h-96" muscleGroups={muscleGroups} refreshExercises={refreshExercises} />
      </div>

      <div className="gap-4 md:flex md:gap-x-4">
        <AddMuscleGroup className="my-4 md:w-1/2 md:my-0" fetchMuscleGroups={fetchMuscleGroups} />
        <AddExercise className="my-4 md:w-1/2 md:my-0" muscleGroups={muscleGroups} handleRefreshExercisesList={handleRefreshExercisesList} />
      </div>

    </main>
  );
}