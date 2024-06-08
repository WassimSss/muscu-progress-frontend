"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import * as React from "react"
import { DayPicker } from "react-day-picker"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAppSelector } from "@/reducer/store"

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  handleChangeMonth: (type: string) => void;
}

const bookedDays = [
  new Date(2024, 5, 8),
  new Date(2024, 5, 9),
  new Date(2024, 5, 10),
  { from: new Date(2024, 5, 15), to: new Date(2024, 5, 20) }
];

function Calendar({
  className,
  classNames,
  showOutsideDays = false,
  handleChangeMonth,
  ...props
}: CalendarProps) {
  const token = useAppSelector(state => state.users.value).token

  return (
    <DayPicker
      onDayClick={(day) => console.log(day)}
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col   space-y-4     text-white ",
        month: "space-y-4  ",
        caption: "flex justify-center pt-1 relative items-center text-primary ",
        caption_label: "text-sm font-medium ",
        nav: "space-x-1 flex items-center  ",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 "
        ),
        nav_button_previous: "absolute left-1 ",
        nav_button_next: "absolute right-1 ",
        table: "min-w-72 w-full border-collapse space-y-1 ",
        head_row: "flex ",
        head_cell:
          "text-muted-foreground rounded-md min-w-9 w-1/6 font-normal text-[0.8rem] m-1  ",
        row: "flex w-full mt-2",
        cell: "h-9 min-w-9 w-1/6 text-center text-sm p-0 m-1 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100  "
        ),
        day_range_end: "day-range-end ",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground ",
        day_today: "bg-accent text-accent-foreground ",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30 ",
        day_disabled: "text-muted-foreground opacity-50 ",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground ",
        day_hidden: "invisible ",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" onClick={() => handleChangeMonth("prev")} />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" onClick={() => handleChangeMonth("next")} />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
