"use client"

import useAuthClientAndRedirect from "@/app/hooks/useAuthClientAndRedirect";
import useAuthServerAndRedirect from "@/app/hooks/useAuthServerAndRedirect";
import { UserWeight } from "@/app/type";
import InputWithLabel from "@/components/ui/InputWithLabel"
import { useAppSelector } from "@/reducer/store";
import moment from "moment";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export default function Page() {
  const requireAuth = true;
  const redirect = "/"
  useAuthServerAndRedirect(requireAuth, redirect);
  useAuthClientAndRedirect(requireAuth, redirect);
  // const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page B', uv: 300, pv: 4567, amt: 2400 }, { name: 'Page C', uv: 300, pv: 1398, amt: 2400 }, { name: 'Page D', uv: 200, pv: 9800, amt: 2400 }, { name: 'Page E', uv: 278, pv: 3908, amt: 2400 }, { name: 'Page F', uv: 189, pv: 4800, amt: 2400 }]
  const [weight, setWeight] = useState<number>(0)
  const [dataWeight, setDataWeight] = useState<UserWeight[]>([])
  const token = useAppSelector(state => state.users.value).token

  const data = dataWeight.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((weight) => {
    const formattedDate = moment(weight.date).format("DD/MM/YYYY")

    return {
      name: formattedDate,
      uv: weight.weight

    }
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setWeight(parseInt(value))
  }

  const handleSubmit = async () => {
    const response = await fetch("https://vercel.com/wassimsss-projects/muscu-progress-backendusers/weights/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        weight: weight
      })
    });

    const data = await response.json();

    if (data.result) {
      toast.success(data.message);
      getWeights();
      return;
    }
    toast.error(data.message);
  }

  const getWeights = useCallback(async () => {
    const response = await fetch("https://vercel.com/wassimsss-projects/muscu-progress-backendusers/weights/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });

    const data = await response.json();

    console.log(data)
    if (data.result) {
      setDataWeight(data.weights)
      return;
    }
    toast.error(data.message);
  }, [token])

  useEffect(() => {
    getWeights();
  }, [getWeights])
  return (
    <main className="flex min-h-screen flex-col items-center mt-24 md:p-16 gap-6 px-4" >
      <h1 className="text-3xl font-bold text-white">Poids</h1>

      <div className="flex flex-col items-center gap-4">
        <div className="flex justify-center items-end gap-4 bg-neutral-800 p-6 rounded-xl ">
          <InputWithLabel label="Poids" type="number" placeholder="Entrez votre poids" id="weight" name="weight" className="text-white" onChange={handleChange} />
          <button className="bg-primary text-white p-2 rounded-lg" onClick={handleSubmit}>Ajouter une pesée</button>
        </div>

        <div className="flex justify-center items-end gap-4 bg-neutral-800 p-6 rounded-xl ">
          {data.length === 0 ? <p className="text-lg text-white">Encore aucun poids enregistré</p> : (
            <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
          )}
        </div>
        <Link href="/app/weight/details" className="bg-primary text-white p-2 rounded-lg">Voir l&apos;historique</Link>
      </div>
    </main >
  )
}