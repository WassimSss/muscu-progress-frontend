// (9,740 x le poids en kilos) + (172,9 x la taille en mètres) – (4,737 x l'âge en années) + 667,051.

import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import InputWithLabel from "./InputWithLabel";
import { Button } from "./button";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";

export default function CalculCaloric({ className }: { className?: string }) {
  const [weight, setWeight] = useState<number | null>(null)
  const [height, setHeight] = useState<number | null>(null)
  const [age, setAge] = useState<number | null>(null)
  const [activity, setActivity] = useState<string | undefined>(undefined)

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(parseInt(e.target.value))
  }

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(parseInt(e.target.value))
  }

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(parseInt(e.target.value))
  }

  const handleActivityChange = (e: string) => {
    console.log(e)
    setActivity(e)
  }

  const activities = [
    { label: "Sédentaire", value: "1.2" },
    { label: "Peu actif", value: "1.375" },
    { label: "Actif", value: "1.55" },
    { label: "Très actif", value: "1.725" },
  ]

  const activitiesOption = activities.map((item: { value: string, label: string }) => {
    return (
      <div key={item.value} className="flex items-center space-x-2" >
        <RadioGroupItem value={item.value} id={item.value} />
        <Label htmlFor={item.value}>{item.label}</Label>
      </div >
    )
  })

  return (
    <div className={`bg-neutral-800 p-6 flex justify-center gap-4 rounded-xl ${className}`}>

      <InputWithLabel label="Poids (kg)" type="number" placeholder="Entrez votre poids" id="weight" name="weight" className="text-white" onChange={handleWeightChange} />
      <InputWithLabel label="Taille (cm)" type="number" placeholder="Entrez votre taille" id="height" name="height" className="text-white" onChange={handleHeightChange} />
      <InputWithLabel label="Age" type="number" placeholder="Entrez votre age" id="age" name="age" className="text-white" onChange={handleAgeChange} />
      <RadioGroup defaultValue={activity} className="text-red flex items-center justify-center my-4" onValueChange={(e: string) => handleActivityChange(e)}>
        {activitiesOption}
      </RadioGroup>
      <Button className="self-end">Calculer</Button>
    </div>
  )
}