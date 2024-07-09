"use client"

import { useAppSelector } from "@/reducer/store";
import { log } from "console";
import { Cable, Cog, Dumbbell, Hand, Minus } from "lucide-react";
import moment from "moment";
import React, { useEffect } from "react";

interface WorkoutSessionProps {
  className?: string;
  fetchWorkoutData: (date: string, isDateSelected?: boolean) => void;
  workouts: WorkoutData[];
  refreshWorkouts: boolean;
  handleRefreshWorkouts: () => void;
};

interface WorkoutExerciseSets {
  weight: number;
  reps: number;
  type: string;
  idSet: number;
}

interface WorkoutExercise {
  name: string;
  sets: WorkoutExerciseSets[];
}

interface WorkoutData {
  muscleGroup: string;
  exercises: WorkoutExercise[]
}

export default function WorkoutSession({ className = "", fetchWorkoutData, workouts, refreshWorkouts, handleRefreshWorkouts }: WorkoutSessionProps): JSX.Element {
  const token = useAppSelector(state => state.users.value).token

  const handleRemove = async (idSet: number) => {
    const response = await fetch(`https://muscu-progress-backend.vercel.app/users/workouts/sets/${idSet}/remove`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (data.result) {
      handleRefreshWorkouts();
    }
  }

  useEffect(() => {
    fetchWorkoutData(moment().format('YYYY-MM-DD'));
  }, [refreshWorkouts, fetchWorkoutData]);



  const workoutRender = workouts.map((workout, i) => {
    return (
      <div key={i} className="w-1/2" >
        <p className="text-primary font-bold text-xl">{workout.muscleGroup}</p>

        {workout.exercises.map((exercise, i) => (
          <div key={i} className="my-4">
            <p className="text-white underline  mb-2">{exercise.name}</p>

            {exercise.sets.map((set, i) => {
              // console.log(set);

              let logoType;
              let typeStyle = "text-white mr-2";
              let typeSize = 18
              switch (set.type) {
                case "dumbbell":
                  logoType = <Dumbbell className={typeStyle} size={typeSize} />
                  break;
                case "machine":
                  logoType = <Cog className={typeStyle} size={typeSize} />
                  break;
                case "cable":
                  logoType = <Cable className={typeStyle} size={typeSize} />
                  break;
                case "bodyweight":
                  logoType = <Hand className={typeStyle} size={typeSize} />
                  break;
              }
              return (
                <div key={i} className="flex items-center">
                  {logoType}
                  <p className="text-white w-16">{set.reps} <span className="text-primary">reps</span></p>
                  <p className="text-white w-16">{set.weight} <span className="text-primary">kg</span></p>
                  <Minus className="text-white hover:text-red-500 transition-colors cursor-pointer" onClick={() => handleRemove(set.idSet)} />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  });
  // <div className="bg-neutral-800 p-6 flex justify-around gap-4 rounded-xl w-96">
  // Diffuser en ligne, est-ce que vous voulez des invitées en présentiel ? Dès aujourd'hui dire qu'il y aura une demo a créer en vidéo
  // qu'elle soit le plus pertinant, ainsi que le scenario. Présentation de 3mn.
  return (
    <div className={`flex bg-neutral-800 p-6 rounded-xl flex-wrap ${className}`}>
      {workoutRender}

    </div>
  );
}