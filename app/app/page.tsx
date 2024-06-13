"use client";

import AddExerciseForm from "@/components/AddExerciseForm";
import WorkoutDayDetails from "@/components/WorkoutDayDetails";
import WorkoutSession from "@/components/ui/WorkoutSession";
import { Calendar } from "@/components/ui/calendar";
import { useAppSelector } from "@/reducer/store";
import React, { useEffect, useCallback } from "react";
import useAuthServerAndRedirect from "../hooks/useAuthServerAndRedirect";
import useAuthClientAndRedirect from "../hooks/useAuthClientAndRedirect";
import { toast } from 'react-toastify';
import { WorkedDays, WorkoutData } from "../type";
const moment = require('moment');

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
  const [workouts, setWorkouts] = React.useState<WorkoutData[]>([]);
  const [selectedWorkouts, setSelectedWorkouts] = React.useState<WorkoutData[]>([]);
  const [refreshWorkouts, setRefreshWorkouts] = React.useState<boolean>(false);
  const token = useAppSelector(state => state.users.value).token;
  const [workoutsDay, setWorkoutsDay] = React.useState<Date[]>([]);
  const [month, setMonth] = React.useState<number>(new Date().getMonth() + 1);
  const [year, setYear] = React.useState<number>(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);

  const [workedDaysByMonth, setWorkedDaysByMonth] = React.useState<WorkedDays>({});

  const today = moment().format('YYYY-MM-DD');
  console.log("token : ", token);

  const fetchWorkoutData = useCallback(async (date: string = today, isDateSelected: boolean = false) => {
    console.log("isDateSelected ? date : today ", isDateSelected ? date : today)
    console.log("isDateSelected : ", isDateSelected)
    console.log("date : ", date)
    console.log("today : ", today)
    // console.log(`https://muscu-progress-backend.vercel.app/users/workouts/get/${isDateSelected ? date : today}`)
    const response = await fetch(`https://muscu-progress-backend.vercel.app/users/workouts/get/${isDateSelected ? date : today}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data.result) {
      if (isDateSelected) {
        setSelectedWorkouts(data.workouts);
        return
      }
      console.log("setWorkouts : ", data.workouts)
      setWorkouts(data.workouts);
    }
    console.log("data fetch workout : ", data)
  }, [today, token]);

  const handleRefreshWorkouts = () => {
    setRefreshWorkouts(!refreshWorkouts);
  }

  const getWorkoutedDays = useCallback(async (month: number, year: number) => {
    const monthYearKey = `${year}-${month}`;
    // Check if the days are already fetched for the month
    if (workedDaysByMonth[monthYearKey]) {
      setWorkoutsDay(workedDaysByMonth[monthYearKey]);
      return;
    }

    const response = await fetch(`https://muscu-progress-backend.vercel.app/users/workouts/get/worked-days/${month}/${year}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data.result) {
      const dateWorkedDays = data.workedDays.map((day: any) => {
        let splitDate = day.split('-');
        return new Date(parseInt(splitDate[0]), parseInt(splitDate[1]) - 1, parseInt(splitDate[2]));
      });

      // Update the state with the fetched data
      setWorkedDaysByMonth(prev => ({ ...prev, [monthYearKey]: dateWorkedDays }));
      setWorkoutsDay(dateWorkedDays);
    }
  }, [token, workedDaysByMonth])

  useEffect(() => {
    getWorkoutedDays(month, year);
  }, [month, year, getWorkoutedDays]);

  const handleChangeMonth = (type: string) => {
    if (type === "prev") {
      if (month === 1) {
        setMonth(12);
        setYear(year - 1);
      } else {
        setMonth(month - 1);
      }
    } else {
      if (month === 12) {
        setMonth(1);
        setYear(year + 1);
      } else {
        setMonth(month + 1);
      }
    }
  }

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    fetchWorkoutData(moment(date).format('YYYY-MM-DD'), true);
  }

  return (
    <main className="flex min-h-screen flex-col mt-24 md:p-16 gap-6 px-4">
      <div className="gap-4 md:flex md:gap-x-4">
        <AddExerciseForm className="my-4 md:w-1/2 md:my-0 justify-start" fetchWorkoutData={fetchWorkoutData} handleRefreshWorkouts={handleRefreshWorkouts} />
        <WorkoutSession className="my-4 md:w-1/2 md:my-0" fetchWorkoutData={fetchWorkoutData} workouts={workouts} refreshWorkouts={refreshWorkouts} handleRefreshWorkouts={handleRefreshWorkouts} />
      </div>

      <div className="md:flex md:justify-between md:gap-x-3">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md my-4 md:my-0 border md:size-1/2 max-w-96 "
          modifiers={{ booked: workoutsDay }}
          modifiersClassNames={{ booked: "bg-primary-shade" }}
          handleChangeMonth={handleChangeMonth}
          handleSelectedDate={handleSelectDate}
        />

        <WorkoutDayDetails className="my-4 md:my-0 md:w-1/2" workouts={selectedWorkouts} selectedDate={selectedDate} />
      </div>
    </main>
  );
}