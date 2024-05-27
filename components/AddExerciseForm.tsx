import InputWithLabel from "./ui/InputWithLabel";
import SelectWithLabel from "./ui/SelectWithLabel";

export default function AddExerciseForm() {

  const options = [{
    value: "1",
    label: "Option 1"
  }, {
    value: "2",
    label: "Option 2"
  }, {
    value: "3",
    label: "Option 3"
  }, {
    value: "4",
    label: "Option 4"
  }]

  return (
    <div className="bg-neutral-800 p-6 flex flex-col justify-center gap-4 rounded-xl">
      <SelectWithLabel label="Type d'exercice" required={true} id="exerciseType" name="exerciseType" className="mb-4 text-white" option={options} />
      <SelectWithLabel label="Groupe musculaire" required={true} id="muscleGroup" name="muscleGroup" className="mb-4 text-white" option={options} />
      <InputWithLabel label="Poids" type="number" placeholder="0" required={true} id="weight" name="weight" className="mb-4 text-white" />
      <InputWithLabel label="Reps" type="number" placeholder="0" required={true} id="reps" name="reps" className="mb-4 text-white" />
    </div>
  )
}