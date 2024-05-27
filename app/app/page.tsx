"use client";

import AddExerciseForm from "@/components/AddExerciseForm";
import WorkoutSession from "@/components/ui/WorkoutSession";
import { Calendar } from "@/components/ui/calendar";
import React from "react";

const bookedDays = [
  new Date(2024, 4, 8),
  new Date(2024, 4, 9),
  new Date(2024, 4, 10),
];

export default function Page() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <main className="flex min-h-screen flex-col mt-24 md:p-24 gap-2 px-4">
      <AddExerciseForm />
      <WorkoutSession />

      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
        modifiers={{ booked: bookedDays }}
        modifiersClassNames={{ booked: "bg-primary" }}
      />
    </main>
  );
}