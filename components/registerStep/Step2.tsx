"use client"

import Link from "next/link";
import { useState } from "react";
import CheckboxWithLabel from "../ui/CheckboxWithLabel";
import InputWithLabel from "../ui/InputWithLabel";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { connectUser } from "@/reducer/slices/usersSlice";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { programs } from "@/app/data";
import { MinusCircle } from "lucide-react";
import { toast } from "react-toastify";
import { useAppSelector } from "@/reducer/store";
import { Button } from "../ui/button";
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
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const token = useAppSelector((state) => state.users.value).token;

  const handleChoseProgram = async (program: string) => {
    const response = await fetch("http://localhost:8080/users/programs/choose", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        program,
      }),
    });

    const data = await response.json();

    if (data.result) {
      toast.success(data.message);
      setSelectedProgram(program);
      return;
    }
    toast.error(data.message);
  }

  const allPrograms = programs.map((program, i) => {
    const currentProgram = selectedProgram === program.value;

    return (
      <div key={i} className="size-24 bg-neutral-700">
        <h1 className="text-2xl">{program.title}</h1>
        <p className="text-base text-gray-400 text-center">
          {program.description}
        </p>
      </div>
    );
  });

  // <CarouselItem key={i}>
  //   <div className={`border-2 ${currentProgram ? "border-primary" : "border-gray-600"}  p-6 text-white bg-neutral-800 flex flex-col items-center justify-between`}>
  //     <MinusCircle size={32} />
  //     <p className="text-2xl">{program.title}</p>
  //     <p className="text-base text-gray-400 text-center">
  //       {program.description}
  //     </p>

  //     {/* <Button className={`${currentProgram && "cursor-default bg-neutral-600 text-neutral-300"}`} onClick={() => handleChoseProgram(program.value)}>
  //       Choisir ce programme
  //     </Button> */}


  //   </div>
  // </CarouselItem >

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

    // const register = await fetch("http://localhost:8080/signup", {
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
            Quel programme souhaitez-vous suivre ?
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Choisissez le programme qui vous convient le mieux</p>
          <div className="space-y-4 md:space-y-6">
            {/* <form onClick={(e) => handleSubmit(e)}> */}
            <div className="flex flex-wrap justify-around">
              {allPrograms}
            </div>


            <button onClick={() => handleSubmit()} className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
            {/* </form> */}
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              <Link href="/app" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Plus tard</Link>
            </p>
          </div>
        </div>
      </div>
    </div>

  )

}