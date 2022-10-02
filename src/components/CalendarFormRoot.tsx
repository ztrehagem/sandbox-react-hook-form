import { Temporal } from "@js-temporal/polyfill";
import React, { useCallback, useState } from "react";
import { CalendarForm } from "./CalendarForm";

export const CalendarFormRoot: React.FC = () => {
  const [yearMonth, setYearMonth] = useState(Temporal.Now.plainDateISO().toPlainYearMonth());

  const prev = useCallback(() => setYearMonth((ym) => ym.add({ months: -1 })), []);
  const next = useCallback(() => setYearMonth((ym) => ym.add({ months: 1 })), []);

  return (
    <div>
      <div>
        <button type="button" onClick={prev}>prev</button>
        <span>&emsp;{yearMonth.toString()}&emsp;</span>
        <button type="button" onClick={next}>next</button>
      </div>

      <CalendarForm yearMonth={yearMonth} />
    </div>
  )
}
