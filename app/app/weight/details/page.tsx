"use client"

import useAuthClientAndRedirect from "@/app/hooks/useAuthClientAndRedirect";
import useAuthServerAndRedirect from "@/app/hooks/useAuthServerAndRedirect";
import { UserWeight } from "@/app/type";
import { useAppSelector } from "@/reducer/store";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
  const requireAuth = true;
  const redirect = "/"
  useAuthServerAndRedirect(requireAuth, redirect);
  useAuthClientAndRedirect(requireAuth, redirect);

  const token = useAppSelector(state => state.users.value).token
  console.log(token)
  const [dataWeight, setDataWeight] = useState<UserWeight[]>([])
  const getWeights = useCallback(async () => {
    const response = await fetch("http://localhost:3000/users/weights/get", {
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

  const handleDelete = async (id: string) => {
    console.log(id)
    const response = await fetch(`http://localhost:3000/users/weights/${id}/remove`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });

    const data = await response.json();

    if (data.result) {
      toast.success(data.message);
      getWeights();
      return;
    }

    toast.error(data.message);
  }

  const weightTableWithDeleteButton = dataWeight.map((weight) => {
    const formattedDate = new Date(weight.date).toLocaleDateString()
    console.log("weight._id : ", weight._id)

    return (
      <tr key={weight._id} className="border-b border-gray-200">
        <td className="py-3 px-6 text-left whitespace-nowrap">
          <div className="flex items-center">
            <span className="font-medium">{formattedDate}</span>
          </div>
        </td>
        <td className="py-3 px-6 text-left whitespace-nowrap">
          <div className="flex items-center">
            <span className="font-medium">{weight.weight}<span className="text-primary">kg</span></span>
          </div>
        </td>
        <td className="py-3 px-6 text-left whitespace-nowrap">
          <div className="flex items-center">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(weight._id)}>Supprimer</button>
          </div>
        </td>
      </tr>
    )
  })

  return (

    <main className="flex min-h-screen flex-col items-center mt-24 md:p-16 gap-6 px-4" >
      <h1 className="text-3xl font-bold text-white">Historique des pésées</h1>
      <div className="flex justify-center items-end gap-4 bg-neutral-800 p-6 rounded-xl text-white ">

        {weightTableWithDeleteButton.length === 0 ? <p className="text-lg text-white">Encore aucun poids enregistré</p> : weightTableWithDeleteButton}
      </div>
      <Link href="/app/weight" className="bg-primary text-white p-2 rounded-lg">Retour aux poids</Link>

    </main>

  )
}