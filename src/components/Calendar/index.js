import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";

export function Calendario() {
  const [dateCharges, setDateCharges] = useState(new Date());
  return (
    <div>
      <Calendar onChange={setDateCharges} value={dateCharges} />
    </div>
  );
}
