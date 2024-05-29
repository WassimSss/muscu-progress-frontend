import { ChevronDown } from "lucide-react";
import { useState } from "react";


const workoutData = [
  {
    muscleGroup: "Chest",
    exercises: [
      [
        { name: "Bench Press", weight: 80, repetitions: 10 },
        { name: "Bench Press", weight: 80, repetitions: 10 },
        { name: "Bench Press", weight: 80, repetitions: 10 },

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
  }
];

type WorkoutDayDetailsProps = {
  className?: string;
}

export default function WorkoutDayDetails({ className = "" }: WorkoutDayDetailsProps): JSX.Element {
  const initialVisibility = workoutData.map(muscleGroup =>
    muscleGroup.exercises.map(() => false)
  );

  const [isExerciseVisible, setIsExerciseVisible] = useState(initialVisibility);

  const toggleVisibility = (muscleGroupIndex: number, exerciseIndex: number) => {
    setIsExerciseVisible(prevState => {
      // Create a deep copy of the state
      const newState = JSON.parse(JSON.stringify(prevState));

      // Toggle the visibility
      newState[muscleGroupIndex][exerciseIndex] = !newState[muscleGroupIndex][exerciseIndex];

      return newState;
    });
  };

  const workoutDayDetails = workoutData.map((muscleGroupExercises, muscleGroupIndex) => {
    return (
      <div key={muscleGroupIndex} className="text-white text">
        <h2 className="text-primary font-bold text-xl gap-y-4">{muscleGroupExercises.muscleGroup}</h2>

        <div className="flex gap-x-4 items-center my-8">
          <p className="w-1/2 underline ">Exercices</p>
          <p className="w-1/6 underline ">Séries</p>
          <p className="w-1/6 underline ">Poids</p>
          <p className="w-1/6 underline ">Reps</p>
        </div>
        {muscleGroupExercises.exercises.map((exercises, exerciseIndex) => {
          return (
            <div key={exerciseIndex} className="mb-2">
              <div className="flex gap-x-4 items-center my-4">
                <p className="w-1/2 ">{exercises[0].name}</p>
                <p className="w-1/6 ">{exercises.length}</p>
                <p className="w-1/6 ">{exercises[0].weight} <span className="text-primary">kg</span></p>
                <p className="w-1/6 ">{exercises[0].repetitions}</p>
                <ChevronDown className="cursor-pointer" onClick={() => toggleVisibility(muscleGroupIndex, exerciseIndex)} />
              </div>
              {isExerciseVisible[muscleGroupIndex][exerciseIndex] && (
                <div className="">
                  {exercises.slice(1).map((exercise, subIndex) => (
                    <div key={subIndex} className="flex gap-x-4 gap-y-4">
                      <p className="w-1/2 "></p>
                      <p className="w-1/6 "></p>
                      <p className="w-1/6  text-neutral-400">{exercise.weight} kg</p>
                      <p className="w-1/6  text-neutral-400">{exercise.repetitions}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  });

  return (
    <div className={`bg-neutral-800 p-6 flex flex-col justify-center gap-4 rounded-xl ${className}`}>
      <p className="text-white font-xl">Séance du <span className="text-primary">08</span>/<span className="text-primary">05</span>/<span className="text-primary">2024</span></p>
      <div className="mx-auto lg:mx-4">
        {workoutDayDetails}
      </div>
    </div>
  );
}
