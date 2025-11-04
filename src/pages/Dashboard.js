import React, { useState } from "react";
import { useSelector } from "react-redux";
import EventCard from "../components/EventCard";
import { filteredEventsSelector } from "../redux/events/eventsSlice";

const getMonthGrid = (year, month) => {
  const first = new Date(year, month, 1);
  const startDay = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();

  const grid = [];

  for (let i = 0; i < 35; i++) {
    const dayOffset = i - startDay + 1;

    if (dayOffset <= 0) {
      grid.push(new Date(year, month - 1, prevDays + dayOffset));
    } else if (dayOffset > daysInMonth) {
      grid.push(new Date(year, month + 1, dayOffset - daysInMonth));
    } else {
      grid.push(new Date(year, month, dayOffset));
    }
  }

  return grid;
};

const Dashboard = () => {
  const events = useSelector(filteredEventsSelector);
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const monthGrid = getMonthGrid(year, month);

  const eventMap = {};
  events.data.forEach((e) => {
    const key = e.dateVenue;
    if (!eventMap[key]) eventMap[key] = [];
    eventMap[key].push(e);
  });

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const monthLabel = new Date(year, month).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return (
    <main className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{monthLabel}</h1>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={prevMonth}
            className="w-8 h-8 flex items-center justify-center border rounded"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={nextMonth}
            className="w-8 h-8 flex items-center justify-center border rounded"
          >
            ›
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px border border-gray-200">
        {days.map((d) => (
          <div
            key={d}
            className="p-2 text-center text-xs font-semibold bg-white border-b"
          >
            {d}
          </div>
        ))}

        {monthGrid.map((date, idx) => {
          const key = date.toISOString().slice(0, 10);
          const isCurrentMonth = date.getMonth() === month;

          return (
            <div
              key={idx}
              className={`p-2 min-h-[120px] border border-gray-200 bg-white ${
                isCurrentMonth ? "" : "bg-gray-100 text-gray-400"
              }`}
            >
              <div className="text-sm font-medium mb-2">{date.getDate()}</div>

              <div className="flex flex-col gap-1">
                {eventMap[key]?.map((ev) => (
                  <EventCard key={ev.id} event={ev} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Dashboard;
