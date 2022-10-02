export interface CalendarFormModel {
  year: number;
  month: number;
  cells: Array<CalendarFormModelCell>
}

export interface CalendarFormModelCell {
  day: number;
  flag: boolean;
}
