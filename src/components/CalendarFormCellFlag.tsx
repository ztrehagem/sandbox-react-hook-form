import { Temporal } from "@js-temporal/polyfill";
import React from "react";
import { Control, useController } from "react-hook-form";
import { CalendarFormModel } from "../models/CalendarFormModel";

export interface Props {
  control: Control<CalendarFormModel>;
  date: Temporal.PlainDate;
}

export const CalendarFormCellFlag: React.FC<Props> = ({ control, date }) => {
  console.debug("render: CalendarFormCellFlag");
  const { field: { value, ...field } } = useController({ control, name: `cells.${date.day - 1}.flag` });

  return (
    <label>
      <span>{value?.toString()}</span>
      <input type="checkbox" checked={value} {...field} />
    </label>
  )
}
