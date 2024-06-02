"use client"

import { useAppSelector } from "@/reducer/store";
import React, { useEffect } from "react";

interface WorkoutSessionProps {
  className?: string;
};

interface WorkoutExerciseSets {
  weight: number;
  reps: number;
}

interface WorkoutExercise {
  name: string;
  sets: WorkoutExerciseSets[];
}

interface WorkoutData {
  muscleGroup: string;
  exercises: WorkoutExercise[]
}

export default function WorkoutSession({ className = "" }: WorkoutSessionProps): JSX.Element {
  const [workouts, setWorkouts] = React.useState<WorkoutData[]>([]);
  const token = useAppSelector(state => state.users.value).token

  const fetchWorkoutData = async () => {
    const response = await fetch("http://localhost:3000/users/workouts/get", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    if (data.result) {
      setWorkouts(data.workouts)
    }
  };
  useEffect(() => {
    fetchWorkoutData();
  }, []);

  const workoutRender = workouts.map((workout, i) => {
    return (
      <div key={i} className="w-1/2">
        <p className="text-primary font-bold text-xl">{workout.muscleGroup}</p>

        {workout.exercises.map((exercise, i) => (
          <div key={i}>
            <p className="text-white underline">{exercise.name}</p>

            {exercise.sets.map((set, i) => (
              <div key={i} className="flex gap-x-4">
                <p className="text-white">{set.reps} <span className="text-primary">reps</span></p>
                <p className="text-white">{set.weight} <span className="text-primary">kg</span></p>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  });
  // <div className="bg-neutral-800 p-6 flex justify-around gap-4 rounded-xl w-96">
  // Diffuser en ligne, est-ce que vous voulez des invitées en présentiel ? Dès aujourd'hui dire qu'il y aura une demo a créer en vidéo
  // qu'elle soit le plus pertinant, ainsi que le scenario. Présentation de 3mn.
  return (
    <div className={`flex bg-neutral-800 p-6 rounded-xl ${className}`}>
      {workoutRender}

    </div>
  );
}