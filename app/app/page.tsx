"use client";

import AddExerciseForm from "@/components/AddExerciseForm";
import WorkoutDayDetails from "@/components/WorkoutDayDetails";
import WorkoutSession from "@/components/ui/WorkoutSession";
import { Calendar } from "@/components/ui/calendar";
import { useAppSelector } from "@/reducer/store";
import React, { useEffect } from "react";
import useAuthServerAndRedirect from "../hooks/useAuthServerAndRedirect";
import useAuthClientAndRedirect from "../hooks/useAuthClientAndRedirect";

const bookedDays = [
  new Date(2024, 4, 8),
  new Date(2024, 4, 9),
  new Date(2024, 4, 10),
];



export default function Page() {
  const requireAuth = true;
  const redirect = "/"
  useAuthServerAndRedirect(requireAuth, redirect);
  useAuthClientAndRedirect(requireAuth, redirect);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [exercises, setExercises] = React.useState<any>([]);

  return (
    <main className="flex min-h-screen flex-col mt-24 md:p-16 gap-6 px-4">
      <div className="gap-4 md:flex md:gap-x-4">
        <AddExerciseForm className="my-4 md:w-1/2 md:my-0 justify-start" />
        <WorkoutSession className="my-4 md:w-1/2 md:my-0" />
      </div>

      <div className="md:flex md:justify-between md:gap-x-3">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md my-4 md:my-0 border md:size-1/2 max-w-96 "
          modifiers={{ booked: bookedDays }}
          modifiersClassNames={{ booked: "bg-primary-shade" }}
        />

        <WorkoutDayDetails className="my-4 md:my-0 md:w-1/2" />
      </div>
    </main>
  );
}