import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { filteredEventsSelector } from "../redux/events/eventsSlice";
import SearchableSelectBox from "./SearchableSelectBox";

export default function Sidebar() {
  const navigate = useNavigate();
  const events = useSelector(filteredEventsSelector);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden fixed top-2/4 left-4 z-1 p-3 bg-white rounded-full shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <i class="fa-solid fa-bars"></i>
      </button>

      <div
        className={`
          fixed md:sticky top-[16.666%] bottom-[16.666%] left-0 w-64 bg-white shadow-lg p-4 flex flex-col gap-6
          transform ${isOpen ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 ease-in-out
          md:translate-x-0 md:flex
          z-40
        `}
      >
        <button
          className="self-end p-2 text-gray-500 hover:text-gray-700 md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <i class="fa-solid fa-x"></i>
        </button>

        <h2 className="text-xl font-semibold mb-4">Sports App</h2>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => {
              navigate("/");
              setIsOpen(false);
            }}
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 text-gray-700 font-medium"
          >
            <i className="fa-solid fa-grip"></i>
            <span className="hidden md:inline">Dashboard</span>
          </button>

          <button
            onClick={() => {
              navigate("/add-event");
              setIsOpen(false);
            }}
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 text-gray-700 font-medium"
          >
            <i className="fa-solid fa-plus"></i>
            <span className="hidden md:inline">Add Event</span>
          </button>
        </div>
        <div className="mt-4 md:mt-6">
          <SearchableSelectBox
            items={events.data.map((ev, idx) => ({
              ...ev,
              id: `${ev.originCompetitionId}-${ev.stage.id}-${ev.homeTeam?.slug}-${ev.awayTeam?.slug}-${ev.dateVenue}-${idx}`,
            }))}
            onSelect={(item, resetInput) => {
              navigate(`/event/${item.id}`);
              resetInput();
              setIsOpen(false);
            }}
            placeholder="Search events..."
          />
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
