import { Temporal } from "@js-temporal/polyfill";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CalendarFormModel } from "../models/CalendarFormModel";
import { CalendarFormCell } from "./CalendarFormCell";

export interface Props {
  yearMonth: Temporal.PlainYearMonth;
}

export const CalendarForm: React.FC<Props> = ({ yearMonth }) => {
  const { year, month } = yearMonth;
  const [loading, setLoading] = useState(true);
  const [abortController, setAbortController] = useState(new AbortController());
  const { control, reset, getValues, watch } = useForm<CalendarFormModel>();

  useEffect(() => {
    const { unsubscribe } = watch((data, { name, type, value }) => {
      console.log(data, name, type, value);
    })
    return unsubscribe;
  }, [watch]);

  useEffect(() => {
    abortController.abort();
    const newAbortController = new AbortController();
    setAbortController(newAbortController);
    setLoading(true);

    createInitialData(year, month).then((initialData) => {
      if (newAbortController.signal.aborted) return;
      reset(initialData);
      setLoading(false);
    });
  }, [year, month]);

  if (loading) {
    return <div>loading...</div>
  }

  const cells = createUICalendarCells(getValues("year"), getValues("month"));

  return (
    <div>
      <ul>
        {cells.map(({ date, isOutOfMonth }) => (
          isOutOfMonth ? (
            <li key={date.toString()}>{date.toString()}</li>
          ) : (
            <li key={date.toString()}>
              <CalendarFormCell control={control} date={date} />
            </li>
          )
        ))}
      </ul>
    </div>
  )
}

const createInitialData = async (year: number, month: number): Promise<CalendarFormModel> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const { daysInMonth } = new Temporal.PlainYearMonth(year, month);

  return {
    year,
    month,
    cells: [...new Array<void>(daysInMonth)].map((_, i) => i + 1).map((day) => ({
      day,
      flag: false,
    }))
  }
}

interface UICalendarCell {
  readonly date: Temporal.PlainDate,
  readonly isOutOfMonth: boolean;
}

export const createUICalendarCells = (year: number, month: number): UICalendarCell[] => {
  const firstDate = Temporal.PlainDate.from({ year, month, day: 1 });
  const firstCellDate = firstDate.add({ days: -firstDate.dayOfWeek });
  return [...Array(42)].map((_, i) => {
    const date = firstCellDate.add({ days: i });
    const isOutOfMonth = date.month != month;
    return { date, isOutOfMonth };
  });
};
