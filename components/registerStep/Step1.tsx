"use client"

import Link from "next/link";
import { useState } from "react";
import CheckboxWithLabel from "../ui/CheckboxWithLabel";
import InputWithLabel from "../ui/InputWithLabel";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { connectUser } from "@/reducer/slices/usersSlice";
import registerData from "../../json/register.json";
import { error } from "console";

interface Step1Props {
  handleStep: (step: string) => void;
}

export default function Step1({ handleStep }: Step1Props) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const dispatch = useDispatch();
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const [registerPending, setRegisterPending] = useState<boolean>(false);

  const router = useRouter();

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

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
    console.log(registerPending);

    if (!registerPending) {


      console.log("handle submit");

      setErrors([]); // Reset errors

      const newErrors: string[] = [];

      if (!name || !email || !password || !confirmPassword) {
        newErrors.push(registerData.form.errors.empty);
        setErrors(newErrors);
        return;
      }

      const nameData = registerData.input.name;
      if (!name) {
        console.log("name : ", name, true);

        newErrors.push(nameData.errors.NotBlank);
      } else if (name.length > nameData.max || name.length < nameData.min) {
        console.log("name : ", name, false);
        newErrors.push(nameData.errors.Size);
      }

      const emailData = registerData.input.email;
      if (!email) {
        newErrors.push(emailData.errors.NotBlank);
      } else if (!email.match(regex)) {
        newErrors.push(emailData.errors.Email);
      }

      const passwordData = registerData.input.password;
      if (password.length < passwordData.min || password.length > passwordData.max) {
        newErrors.push(passwordData.errors.Size);
      }

      const confirmPasswordData = registerData.input.passwordConfirmation;
      if (password !== confirmPassword) {
        newErrors.push(confirmPasswordData.errors.EqualTo);
      }

      setErrors(newErrors);



      // handleStep("2");

      // if (errors.length === 0) {
      setRegisterPending(true)
      const register = await fetch("http://localhost:8080/api/public/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassword
        })
      });

      const data = await register.json();

      console.log(data)
      setRegisterPending(false)

      if (data.result) {
        dispatch(connectUser({ token: data.token, roles: data.roles }));

      } else {
        setErrors(data.errors);
      }
      // }

    }

    // console.log("data", data);
  }

  const displayErrors = errors.map((error: string, index: number) => {
    return <li key={index} className="text-red-500">{error}</li>
  })
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
            <InputWithLabel label="Votre nom" type="text" placeholder="Nom" id="name" name="name" value={name} onChange={handleChangeName} />
            <InputWithLabel label="Votre email" type="email" placeholder="email@gmail.com" id="email" name="email" value={email} onChange={handleChangeEmail} />
            <InputWithLabel label="Mot de passe" type="password" placeholder="••••••••" id="password" name="password" value={password} onChange={handleChangePassword} />
            <InputWithLabel label="Confirmer le mot de passe" type="password" placeholder="••••••••" id="confirm-password" name="confirm-password" value={confirmPassword} onChange={handleChangeConfirmPassword} />

            {errors && <ul>
              {displayErrors}
            </ul>}
            <CheckboxWithLabel label="I agree to the" id="terms" name="terms" textLink="terms and privacy policy" url="#" />
            <button onClick={() => handleSubmit()} className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{registerPending ? <div role="status">
              <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span className="sr-only">Loading...</span>
            </div> : 'Create an account'}</button>
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