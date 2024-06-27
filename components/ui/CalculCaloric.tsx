import useAuthClientAndRedirect from "@/app/hooks/useAuthClientAndRedirect";
import useAuthServerAndRedirect from "@/app/hooks/useAuthServerAndRedirect";
import CalculCaloric from "@/components/ui/CalculCaloric";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import InputWithLabel from "./InputWithLabel";
import { useState } from "react";
import { Button } from "./button";

export default function Page({ className }: { className?: string }) {
  const requireAuth = true;
  const redirect = "/"
  useAuthServerAndRedirect(requireAuth, redirect);
  useAuthClientAndRedirect(requireAuth, redirect);

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
    { label: "Sédentaire", value: "one" },
    { label: "Peu actif", value: "two" },
    { label: "Actif", value: "three" },
    { label: "Très actif", value: "four" },
  ]

  const activitiesOption = activities.map((item: { value: string, label: string }) => {
    return (
      <div key={item.value} className="flex flex-col justify-around items-center space-x-2" >
        <RadioGroupItem className="mb-2" value={item.value} id={item.value} />
        <Label htmlFor={item.value}>{item.label}</Label>
      </div >
    )
  })
  return (
    <div className={`bg-neutral-800 p-6 flex flex-col xl:flex-row justify-center gap-4 rounded-xl ${className}`}>

      <InputWithLabel label="Poids (kg)" type="number" placeholder="Entrez votre poids" id="weight" name="weight" className="text-white" onChange={handleWeightChange} />
      <InputWithLabel label="Taille (cm)" type="number" placeholder="Entrez votre taille" id="height" name="height" className="text-white" onChange={handleHeightChange} />
      <InputWithLabel label="Age" type="number" placeholder="Entrez votre age" id="age" name="age" className="text-white" onChange={handleAgeChange} />
      <RadioGroup defaultValue={activity} className="text-red flex items-center justify-center my-4" onValueChange={(e: string) => handleActivityChange(e)}>
        {activitiesOption}
      </RadioGroup>
      <Button className="xl:self-end">Calculer</Button>

    </div>
  )
}