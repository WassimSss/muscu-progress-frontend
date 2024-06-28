import useAuthClientAndRedirect from "@/app/hooks/useAuthClientAndRedirect";
import useAuthServerAndRedirect from "@/app/hooks/useAuthServerAndRedirect";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import InputWithLabel from "./InputWithLabel";
import { use, useCallback, useEffect, useState } from "react";
import { Button } from "./button";
import { toast } from "react-toastify";
import { useAppSelector } from "@/reducer/store";

export default function Page({ className }: { className?: string }) {
  const requireAuth = true;
  const redirect = "/"
  useAuthServerAndRedirect(requireAuth, redirect);
  useAuthClientAndRedirect(requireAuth, redirect);

  const [weight, setWeight] = useState<number | null>(null)
  const [height, setHeight] = useState<number | null>(null)
  const [age, setAge] = useState<number | null>(null)
  const [activity, setActivity] = useState<number | undefined>(undefined)
  const token = useAppSelector(state => state.users.value).token;



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
    console.log(e, activity)
    setActivity(parseFloat(e))
  }



  const activities = [
    { label: "Sédentaire", value: 1.2 },
    { label: "Peu actif", value: 1.375 },
    { label: "Actif", value: 1.55 },
    { label: "Très actif", value: 1.725 },
  ]

  const activitiesOption = activities.map((item: { value: number, label: string }) => {
    return (
      <div key={item.value} className="flex flex-col justify-around items-center space-x-2" >
        <RadioGroupItem className="mb-2" value={item.value.toString()} id={item.value.toString()} />
        <Label htmlFor={item.value.toString()}>{item.label}</Label>
      </div >
    )
  })

  const handleCaloricCalculation = async () => {
    //  (9,740 x le poids en kilos) + (172,9 x la taille en mètres) – (4,737 x l'âge en années) + 667,051. 
    console.log(weight, (height! / 100), age, activity);

    if (!weight || !height || !age || !activity) {
      return toast.error("Veuillez remplir tous les champs");
    }
    let result = Math.round(((9.740 * weight!) + (172.9 * (height / 100)!) - (4.737 * age!) + 667.051) * activity);



    const response = await fetch("http://localhost:3000/users/calories/needs/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        caloricNeeds: result
      })
    })

    const data = await response.json();

    console.log(data);

    if (data.result) {
      toast.success(data.message)
    } else {
      toast.error(data.message)
    }

  }

  return (
    <div className={`bg-neutral-800 p-6 flex flex-col xl:flex-row justify-center gap-4 rounded-xl ${className}`}>

      <InputWithLabel label="Poids (kg)" type="number" placeholder="Entrez votre poids" id="weight" name="weight" className="text-white" onChange={handleWeightChange} />
      <InputWithLabel label="Taille (cm)" type="number" placeholder="Entrez votre taille" id="height" name="height" className="text-white" onChange={handleHeightChange} />
      <InputWithLabel label="Age" type="number" placeholder="Entrez votre age" id="age" name="age" className="text-white" onChange={handleAgeChange} />
      <RadioGroup defaultValue={activity?.toString()} className="text-red flex items-center justify-center my-4" onValueChange={(e: string) => handleActivityChange(e)}>
        {activitiesOption}
      </RadioGroup>
      <Button className="xl:self-end" onClick={handleCaloricCalculation}>Calculer</Button>

    </div>
  )
}