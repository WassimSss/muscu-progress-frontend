import { WorkoutData } from "@/app/type";
import { ChevronDown } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";


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
  workouts?: WorkoutData[];
  selectedDate?: Date;
}

export default function WorkoutDayDetails({ className = "", workouts = [], selectedDate }: WorkoutDayDetailsProps): JSX.Element {
  const initialVisibility = workouts.map(muscleGroup =>
    muscleGroup.exercises.map(() => false)
  );

  const [isExerciseVisible, setIsExerciseVisible] = useState(initialVisibility);

  const toggleVisibility = (muscleGroupIndex: number, exerciseIndex: number) => {
    setIsExerciseVisible(prevState => {
      const newState = JSON.parse(JSON.stringify(prevState));
      newState[muscleGroupIndex][exerciseIndex] = !newState[muscleGroupIndex][exerciseIndex];
      return newState;
    });
  };

  useEffect(() => {
    if (workouts.length === 0) {
      setIsExerciseVisible([]);
    } else {
      const initialVisibility = workouts.map(muscleGroup =>
        muscleGroup.exercises.map(() => false)
      );
      setIsExerciseVisible(initialVisibility);
    }
    console.log("workouts : ", workouts);

  }, [workouts]);

  const workoutDayDetails = workouts.map((muscleGroupExercises, muscleGroupIndex) => (
    <div key={muscleGroupIndex} className="text-white text">
      <h2 className="text-primary font-bold text-xl gap-y-4">{muscleGroupExercises.muscleGroup}</h2>

      <div className="flex gap-x-4 items-center my-8">
        <p className="w-1/2 underline">Exercices</p>
        <p className="w-1/6 underline">Séries</p>
        <p className="w-1/6 underline">Poids</p>
        <p className="w-1/6 underline">Reps</p>
      </div>

      {muscleGroupExercises.exercises.map((exercise, exerciseIndex) => (
        <div key={exerciseIndex} className="mb-2">
          <div className="flex gap-x-4 items-center my-4">
            <p className="w-1/2">{exercise.name}</p>
            <p className="w-1/6">{exercise.sets.length}</p>
            <p className="w-1/6">{exercise.sets[0].weight} <span className="text-primary">kg</span></p>
            <p className="w-1/6">{exercise.sets[0].reps}</p>
            <ChevronDown className="cursor-pointer" onClick={() => toggleVisibility(muscleGroupIndex, exerciseIndex)} />
          </div>
          {isExerciseVisible[muscleGroupIndex] && isExerciseVisible[muscleGroupIndex][exerciseIndex] && (
            <div>
              {exercise.sets.slice(1).map((set, setIndex) => (
                <div key={setIndex} className="flex gap-x-4 gap-y-4">
                  <p className="w-1/2"></p>
                  <p className="w-1/6"></p>
                  <p className="w-1/6 text-neutral-400">{set.weight} kg</p>
                  <p className="w-1/6 text-neutral-400">{set.reps}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  ));

  return (
    <div className={`bg-neutral-800 p-6 flex flex-col gap-4 rounded-xl ${className}`}>

      {selectedDate ? <p className="text-white font-xl">
        Séance du <span className="text-primary">{moment(selectedDate).format('DD')}</span>/
        <span className="text-primary">{moment(selectedDate).format('MM')}</span>/
        <span className="text-primary">{moment(selectedDate).format('YYYY')}</span>
      </p> : <p className="text-white font-xl">Sélectionnez une date pour afficher les détails de la séance</p>}

      <div className="mx-auto lg:mx-4">
        {workoutDayDetails}
      </div>
    </div>
  );
}

