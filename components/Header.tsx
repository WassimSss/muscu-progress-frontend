import Link from "next/link";
import AnimatedButton from "./ui/AnimatedButton";

export default function Header() {

  return (


    <nav className="bg-white border-gray-200 dark:bg-primary">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* <Image src="/wired-flat-1807-boxing-glove.gif" alt="Logo" width={50} height={50} /> */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-lg font-bold text-gray-900 dark:text-gray-100">MuscuProgress</Link>
          <Link href="#" className="text-gray-900 dark:text-gray-100">Exercices</Link>
          <Link href="#" className="text-gray-900 dark:text-gray-100">Workouts</Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="#" className="text-gray-900 dark:text-gray-100">
            <AnimatedButton text="Se connecter" horizontalPadding={4} verticalPadding={2} backgroundColor={"primary"} textColor={"white"} backgroundShadeColor={"primary-shade"} outlineBorder={true} />
          </Link>
          <Link href="#" className="text-gray-900 dark:text-gray-100">
            <AnimatedButton text={"S'inscrire"} horizontalPadding={4} verticalPadding={2} backgroundColor={"primary"} textColor={"white"} backgroundShadeColor={"primary-shade"} outlineBorder={true} />
          </Link>        </div >
      </div >
    </nav >

  )
}