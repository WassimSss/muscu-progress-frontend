import { MoveLeft, MoveRight } from "lucide-react";

export default function StepArrow() {

  return (
    <div className="flex justify-between items-center w-80 sm:w-full md:w-3/4 lg:w-1/2 mx-6">
      <MoveLeft color={"white"} size={48} />
      <MoveRight color={"white"} size={48} />
    </div>
  )
}