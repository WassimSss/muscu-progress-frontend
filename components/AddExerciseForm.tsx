import React, { useEffect } from "react";
import InputWithLabel from "./ui/InputWithLabel";
import SelectWithLabel from "./ui/SelectWithLabel";
import { useAppSelector } from "@/reducer/store";
import { ExerciseObject, ExercisesObjectData, MuscleGroupObject, MuscleGroupsData } from "@/app/type";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type AddExerciseFormProps = {
  className: string;
  fetchWorkoutData: () => void;
  handleRefreshWorkouts: () => void;

}

export default function AddExerciseForm({ className, handleRefreshWorkouts }: AddExerciseFormProps): JSX.Element {
  const [muscleGroups, setMuscleGroups] = React.useState<MuscleGroupObject[]>([])
  const [exercises, setExercises] = React.useState<ExerciseObject[]>([])

  const [selectedMuscleGroup, setSelectedMuscleGroup] = React.useState<string | null>(null)
  const [selectedExercise, setSelectedExercise] = React.useState<string | null>(null)
  const [weight, setWeight] = React.useState<string | null>(null)
  const [reps, setReps] = React.useState<string | null>(null)
  const [type, setType] = React.useState<string>("dumbbell")
  const token = useAppSelector(state => state.users.value).token

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

  const handleMuscleGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setSelectedMuscleGroup(value);
    setSelectedExercise(null);
    console.log(selectedMuscleGroup, value);
    fetch(`https://muscu-progress-backend.vercel.app/users/exercises/get/${value}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data: ExercisesObjectData) => {
        if (data.result) {
          setExercises(data.exercises)
          data.exercises[0] && setSelectedExercise(data.exercises[0]._id)

        }

      });
  }

  const handleExerciseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setSelectedExercise(value)
  }

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setWeight(parseInt(e.target.value))

    let str = e.target.value;

    // Permettre uniquement les nombres et un seul point
    const regex = /^\d{0,4}([.,]\d{0,2})?$/;

    if (regex.test(str)) {
      setWeight(str);
    }
  }

  const handleRepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    let str = e.target.value;

    // Permettre uniquement les nombres et un seul point
    const regex = /^\d{0,4}([.,]\d{0,2})?$/;

    if (regex.test(str)) {
      setReps(str);
    }
  }

  const muscleGroupsOption = muscleGroups.map((muscleGroup: MuscleGroupObject) => {
    return {
      value: muscleGroup._id,
      label: muscleGroup.name
    }
  }).sort((a: any, b: any) => a.label.localeCompare(b.label))



  const exercisesOption = exercises.map((exercise: ExerciseObject) => {
    return {
      value: exercise._id,
      label: exercise.name
    }
  }).sort((a: any, b: any) => a.label.localeCompare(b.label))

  const typeExerciseOption = [
    { value: "dumbbell", label: "Haltère" },
    { value: "machine", label: "Machine" },
    { value: "cable", label: "Câble" },
    { value: "bodyweight", label: "Poids du corps" }
  ]

  const exerciseOption = typeExerciseOption.map((type: { value: string, label: string }) => {
    return (
      <div key={type.value} className="flex items-center space-x-2" >
        <RadioGroupItem value={type.value} id={type.value} />
        <Label htmlFor={type.value}>{type.label}</Label>
      </div >
    );
  });

  const handleTypeChange = (e: string) => {
    setType(e)
  }

  const handleSubmit = async () => {

    console.log({
      idMuscleGroup: selectedMuscleGroup,
      idExercise: selectedExercise,
      weight: weight,
      repetitions: reps,
      type: type
    });
    // return;

    const addWokout = await fetch("https://muscu-progress-backend.vercel.app/users/workouts/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        idMuscleGroup: selectedMuscleGroup,
        idExercise: selectedExercise,
        weight: weight,
        repetitions: reps,
        type: type
      }),
    });

    const data = await addWokout.json();

    console.log("data add : ", data)
    handleRefreshWorkouts();
  }
  return (
    <div className={`bg-neutral-800 p-6 flex flex-col justify-center gap-4 rounded-xl ${className}`}>
      <SelectWithLabel label="Groupe musculaire" required={true} id="muscleGroup" name="muscleGroup" className="mb-4 text-white" option={muscleGroupsOption} onChange={handleMuscleGroupChange} text="Selectionner un groupe musculaire" />
      <SelectWithLabel label="Type d exercice" required={true} id="exerciseType" name="exerciseType" className="mb-4 text-white" option={exercisesOption} onChange={handleExerciseChange} active={selectedMuscleGroup !== null} text="Selectionner un exercice" />
      <InputWithLabel label="Poids" type="number" placeholder="0" required={true} id="weight" name="weight" className="mb-4 text-white" minLength={0} maxLength={3} active={selectedExercise !== null} onChange={(e) => handleWeightChange(e)} value={weight ? weight.toString() : ""} />
      <InputWithLabel label="Reps" type="number" placeholder="0" required={true} id="reps" name="reps" className="mb-4 text-white" minLength={0} maxLength={3} active={selectedExercise !== null} onChange={(e) => handleRepsChange(e)} value={reps ? reps.toString() : ""} />

      <RadioGroup defaultValue={type} className="text-white flex items-center justify-center my-4" onValueChange={(e: string) => handleTypeChange(e)}>
        {exerciseOption}
      </RadioGroup>

      <button onClick={handleSubmit} className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Ajouter</button>

    </div >
  )
}