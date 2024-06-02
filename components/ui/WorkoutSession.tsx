"use client"

import { useAppSelector } from "@/reducer/store";
import React, { useEffect } from "react";

type WorkoutSessionProps = {
  className?: string;
};

export default function WorkoutSession({ className = "" }: WorkoutSessionProps): JSX.Element {
  const [workouts, setWorkouts] = React.useState<any[]>([]);
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
  }, [])

  // const workoutData = [
  //   muscleGroup: workouts[0].muscleGroup,

  const workoutData = [
    {
      muscleGroup: "Chest",
      exercises: [
        [
          { name: "Bench Press", weight: 80, repetitions: 10 },
          { name: "Bench Press", weight: 80, repetitions: 10 },
          { name: "Bench Press", weight: 80, repetitions: 10 },
        ],
        [
          { name: "Incline Dumbbell Press", weight: 30, repetitions: 12 },
          { name: "Incline Dumbbell Press", weight: 30, repetitions: 12 },
          { name: "Incline Dumbbell Press", weight: 30, repetitions: 12 },
        ],
        [
          { name: "Cable Flyes", weight: 20, repetitions: 15 },
          { name: "Cable Flyes", weight: 20, repetitions: 15 },
          { name: "Cable Flyes", weight: 20, repetitions: 15 },
        ],
        [
          { name: "Push-ups", weight: 0, repetitions: 20 },
          { name: "Push-ups", weight: 0, repetitions: 20 },
          { name: "Push-ups", weight: 0, repetitions: 20 },
        ],
        [
          { name: "Chest Dips", weight: 0, repetitions: 15 },
          { name: "Chest Dips", weight: 0, repetitions: 15 },
          { name: "Chest Dips", weight: 0, repetitions: 15 },
        ],
      ],
    },
    {
      muscleGroup: "Back",
      exercises: [
        [
          { name: "Deadlift", weight: 100, repetitions: 8 },
          { name: "Deadlift", weight: 100, repetitions: 8 },
          { name: "Deadlift", weight: 100, repetitions: 8 },
        ],
        [
          { name: "Pull-ups", weight: 0, repetitions: 10 },
          { name: "Pull-ups", weight: 0, repetitions: 10 },
          { name: "Pull-ups", weight: 0, repetitions: 10 },
        ],
        [
          { name: "Bent-over Rows", weight: 60, repetitions: 12 },
          { name: "Bent-over Rows", weight: 60, repetitions: 12 },
          { name: "Bent-over Rows", weight: 60, repetitions: 12 },
        ],
        [
          { name: "Lat Pulldowns", weight: 50, repetitions: 15 },
          { name: "Lat Pulldowns", weight: 50, repetitions: 15 },
          { name: "Lat Pulldowns", weight: 50, repetitions: 15 },
        ],
        [
          { name: "T-Bar Rows", weight: 70, repetitions: 10 },
          { name: "T-Bar Rows", weight: 70, repetitions: 10 },
          { name: "T-Bar Rows", weight: 70, repetitions: 10 },
        ],
      ],
    },
  ];

  const workout = workoutData.map((workout, i) => {
    console.log(i % 2);

    return (
      <div key={i}>
        <p className="text-primary font-bold text-xl">{workout.muscleGroup}</p>

        <div className="flex flex-col gap-4">
          {workout.exercises.map((exercise, i) => {
            return (
              <div key={i}>
                <p className="text-white underline text-lg">{exercise[0].name}</p>

                {exercise.map((set, i) => {
                  return (
                    <div key={i} className="flex gap-x-4">
                      <p className="text-white">{set.repetitions} <span className="text-primary">reps</span></p>
                      <p className="text-white">{set.weight} <span className="text-primary">kg</span></p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  });

  // <div className="bg-neutral-800 p-6 flex justify-around gap-4 rounded-xl w-96">
  // Diffuser en ligne, est-ce que vous voulez des invitées en présentiel ? Dès aujourd'hui dire qu'il y aura une demo a créer en vidéo
  // qu'elle soit le plus pertinant, ainsi que le scenario. Présentation de 3mn.
  return (
    <div className={`flex bg-neutral-800 p-6 rounded-xl ${className}`}>
      <div className="w-1/2 flex flex-col gap-4">
        {workoutData
          .filter((_, index) => index % 2 === 0)
          .map((workout, i) => (
            <div key={i}>
              <p className="font-bold text-xl text-primary">
                {workout.muscleGroup}
              </p>
              <div className="flex flex-col gap-4">
                {workout.exercises.map((exercise, j) => (
                  <div key={j}>
                    <p className="text-white underline text-lg">
                      {exercise[0].name}
                    </p>
                    {exercise.map((set, k) => (
                      <div key={k} className="flex gap-x-4">
                        <p className="text-white">
                          {set.repetitions}{" "}
                          <span className="text-primary">reps</span>
                        </p>
                        <p className="text-white">
                          {set.weight} <span className="text-primary">kg</span>
                        </p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
      <div className="w-1/2 flex flex-col gap-4">
        {workoutData
          .filter((_, index) => index % 2 !== 0)
          .map((workout, i) => (
            <div key={i}>
              <p className="text-primary font-bold text-xl">
                {workout.muscleGroup}
              </p>
              <div className="flex flex-col gap-4">
                {workout.exercises.map((exercise, j) => (
                  <div key={j}>
                    <p className="text-white underline text-lg">
                      {exercise[0].name}
                    </p>
                    {exercise.map((set, k) => (
                      <div key={k} className="flex gap-x-4">
                        <p className="text-white">
                          {set.repetitions}{" "}
                          <span className="text-primary">reps</span>
                        </p>
                        <p className="text-white">
                          {set.weight} <span className="text-primary">kg</span>
                        </p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}