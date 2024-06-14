"use client"

import InputWithLabel from "@/components/ui/InputWithLabel"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export default function Page() {
  const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page B', uv: 300, pv: 4567, amt: 2400 }, { name: 'Page C', uv: 300, pv: 1398, amt: 2400 }, { name: 'Page D', uv: 200, pv: 9800, amt: 2400 }, { name: 'Page E', uv: 278, pv: 3908, amt: 2400 }, { name: 'Page F', uv: 189, pv: 4800, amt: 2400 }]

  return (
    <main className="flex min-h-screen flex-col items-center mt-24 md:p-16 gap-6 px-4">
      <h1 className="text-3xl font-bold text-white">Poids</h1>

      <div className="flex flex-col items-center gap-4">
        <div className="flex justify-center items-end gap-4 bg-neutral-800 p-6 rounded-xl ">
          <InputWithLabel label="Poids" type="number" placeholder="Entrez votre poids" id="weight" name="weight" className="text-white" />
          <button className="bg-primary text-white p-2 rounded-lg">Ajouter une pesée</button>
        </div>

        <div className="flex justify-center items-end gap-4 bg-neutral-800 p-6 rounded-xl ">
          <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </div>
        <button className="bg-primary text-white p-2 rounded-lg">Voir l&apos;historique</button>
      </div>
    </main>
  )
}