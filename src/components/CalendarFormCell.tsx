import { Temporal } from "@js-temporal/polyfill";
import React from "react";
import { Control } from "react-hook-form";
import { CalendarFormModel } from "../models/CalendarFormModel";
import { CalendarFormCellFlag } from "./CalendarFormCellFlag";

export interface Props {
  control: Control<CalendarFormModel>;
  date: Temporal.PlainDate;
}

export const CalendarFormCell: React.FC<Props> = ({ control, date }) => {
  return (
    <div>
      <div>{date.day}</div>
      <CalendarFormCellFlag control={control} date={date} />
    </div>
  )
}
