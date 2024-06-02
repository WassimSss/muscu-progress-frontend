/* eslint-disable react/no-unescaped-entities */
"use client"

import InputWithLabel from "@/components/ui/InputWithLabel";
import { addTokenToUser } from "@/reducer/slices/usersSlice";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Oval } from 'react-loader-spinner';
import useAuthServerAndRedirect from "../hooks/useAuthServerAndRedirect";
import useAuthClientAndRedirect from "../hooks/useAuthClientAndRedirect";

export default function Page() {
  const requireAuth = false;
  const redirect = "/app"

  useAuthServerAndRedirect(requireAuth, redirect);
  useAuthClientAndRedirect(requireAuth, redirect);

  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }


    setError("");

    const signin = await fetch("http://localhost:3000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await signin.json();

    if (data.result) {
      setLoading(true);
      dispatch(addTokenToUser(data.token));
      router.push("/app");
    } else {
      setError("Email ou mot de passe incorrect");
    }
    console.log(data)
  }



  return (
    <main className="flex min-h-screen flex-col items-center mt-14 w-full">
      <h1 className="font-bold text-primary text-xl mb-8">Se connecter</h1>

      <div className="flex flex-col items-center justify-center px-6 py-8 lg:py-0 w-full">

        {loading === false ? (
          <div className="w-96 max-w-screen-md bg-white rounded-lg shadow dark:border md:mt-0 sm:w-3/4 md:w-1/2 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Se connecter
              </h1>
              <div className="space-y-4 md:space-y-6">
                <form onSubmit={(e) => handleSubmit(e)}>
                  <InputWithLabel label="Votre email" type="email" placeholder="email@gmail.com" id="email" name="email" value={email} onChange={handleChangeEmail} />
                  <InputWithLabel label="Mot de passe" type="password" placeholder="••••••••" id="password" name="password" value={password} onChange={handleChangePassword} />


                  {error && <p className="text-red-500">{error}</p>}

                  <button type="submit" className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Se connecter</button>
                </form>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Vous n'avez pas de compte ? <Link href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">S'inscrire ici</Link>
                </p>
              </div>
            </div>
          </div>
        ) : <Oval
          visible={true}
          height="200"
          width="200"
          color="#7e24f5"
          secondaryColor="#ffffff"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />}

      </div>


    </main >
  );
}