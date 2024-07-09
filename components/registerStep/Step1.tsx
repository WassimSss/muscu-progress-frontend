"use client"

import Link from "next/link";
import { useState } from "react";
import CheckboxWithLabel from "../ui/CheckboxWithLabel";
import InputWithLabel from "../ui/InputWithLabel";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { connectUser } from "@/reducer/slices/usersSlice";

interface Step1Props {
  handleStep: (step: string) => void;
}

export default function Step1({ handleStep }: Step1Props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const router = useRouter();
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const handleChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  }

  const handleSubmit = async () => {
    if (!email || !password || !confirmPassword) {
      setError("Veuillez remplir tous les champs");
      console.log(1);

      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      console.log(2);
      return;
    }

    setError("");
    handleStep("2");

    // const register = await fetch("https://muscu-progress-backend.vercel.app/signup", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     email,
    //     password,
    //     confirmPassword
    //   })
    // });
    // const data = await register.json();

    // if (data.result) {
    //   dispatch(connectUser({ token: data.token, roles: data.roles }));

    // } else {
    //   setError(data.message);
    // }
    // console.log("data", data);
  }
  // </div>
  return (

    <div className="flex flex-col items-center justify-center px-6 py-8 lg:py-0 w-full">

      <div className="w-96 max-w-screen-md bg-white rounded-lg shadow dark:border md:mt-0 sm:w-3/4 md:w-1/2 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Créer un compte
          </h1>
          <div className="space-y-4 md:space-y-6">
            {/* <form onClick={(e) => handleSubmit(e)}> */}
            <InputWithLabel label="Votre email" type="email" placeholder="email@gmail.com" id="email" name="email" value={email} onChange={handleChangeEmail} />
            <InputWithLabel label="Mot de passe" type="password" placeholder="••••••••" id="password" name="password" value={password} onChange={handleChangePassword} />
            <InputWithLabel label="Confirmer le mot de passe" type="password" placeholder="••••••••" id="confirm-password" name="confirm-password" value={confirmPassword} onChange={handleChangeConfirmPassword} />

            {error && <p className="text-red-500">{error}</p>}
            <CheckboxWithLabel label="I agree to the" id="terms" name="terms" textLink="terms and privacy policy" url="#" />
            <button onClick={() => handleSubmit()} className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
            {/* </form> */}
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Vous avez déjà un compte ? <Link href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Se connecter ici</Link>
            </p>
          </div>
        </div>
      </div>
    </div>

  )

}