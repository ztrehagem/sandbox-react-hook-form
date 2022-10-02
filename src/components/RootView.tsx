import React, { useCallback, useState } from "react";
import { Temporal } from "@js-temporal/polyfill";
import { CalendarFormRoot } from "./CalendarFormRoot";

export const RootView: React.FC = () => {
  return (
    <div>
      <CalendarFormRoot />
    </div>
  )
}
