"use client"

import type * as React from "react"
import { Calendar } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  selected: Date | Date[] | undefined
  onChange: (date: Date | Date[] | undefined) => void
  multiple?: boolean
}

export function DatePicker({ selected, onChange, className, multiple, ...props }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !selected && "text-muted-foreground",
            className,
          )}
          {...props}
        >
          {selected ? (
            <span>
              {selected instanceof Date
                ? selected.toLocaleDateString()
                : Array.isArray(selected)
                  ? selected.map((date) => date.toLocaleDateString()).join(", ")
                  : "Select a date"}
            </span>
          ) : (
            <span>Pick a date</span>
          )}
          <Calendar className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <CalendarComponent
          mode={multiple ? "multiple" : "single"}
          selected={selected}
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

