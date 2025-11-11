import React from "react";
import { useNavigate } from "react-router-dom";
import SearchableSelectBox from "../components/SearchableSelectBox";
import { useSelector } from "react-redux";
import { filteredEventsSelector } from "../redux/events/eventsSlice";
import generateEventId from "../utils/generateEventId";

export default function TopBar() {
  const navigate = useNavigate();
  const events = useSelector(filteredEventsSelector);

  return (
    <header className="flex h-16 items-center z-10 justify-between border-b border-gray-200 bg-white px-4 md:px-6">
      {/* Search Box */}
      <div className="w-full max-w-full md:max-w-2xl mx-auto">
        <SearchableSelectBox
          className="w-10"
          items={events.data.map((ev, idx) => ({
            ...ev,
            id: generateEventId(ev, idx),
          }))}
          onClick={(item, resetInput) => {
            navigate(`/event/${item.id}`);
            resetInput();
          }}
          placeholder="Search events..."
        />
      </div>
    </header>
  );
}
