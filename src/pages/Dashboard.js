import React from "react";
import { useSelector } from "react-redux";
import EventCard from "../components/EventCard";
import { filteredEventsSelector } from "../redux/events/eventsSlice";

const Dashboard = () => {
  const events = useSelector(filteredEventsSelector);
  return (
    <main className="flex flex-1 flex-col overflow-y-auto p-4 md:p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#0d121b] dark:text-black">
          November 2025
        </h1>
      </div>

      <div className="grid flex-1 grid-cols-7 grid-rows-[auto,1fr,1fr,1fr,1fr,1fr] gap-px border-l border-t border-gray-200 dark:border-gray-700 bg-gray-200 ">
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
          <div
            key={day}
            className="bg-background-light dark:bg-background-dark p-2 text-center text-xs font-semibold text-gray-500 "
          >
            {day}
          </div>
        ))}

        {Array.from({ length: 31 }, (_, i) => (
          <div
            key={i}
            className="relative flex flex-col bg-white dark:bg-gray-800/50 p-2"
          >
            <span className="absolute top-2 right-2 text-sm">{i + 1}</span>
            <div className="mt-8 flex flex-col gap-1.5 overflow-hidden">
              {/* O güne ait event varsa map et */}
              {events
                .filter((e) =>
                  e.dateVenue.endsWith(String(i + 1).padStart(2, "0"))
                )
                .map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Dashboard;
