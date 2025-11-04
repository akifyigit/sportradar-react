import React from "react";
import SearchableSelect from "./SearchableSelectBox";
import { filteredEventsSelector } from "../redux/events/eventsSlice";
import { useSelector } from "react-redux";
export default function Sidebar() {
  const events = useSelector(filteredEventsSelector);
  return (
    <div className="w-64 bg-white shadow-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Sports App</h2>
      <SearchableSelect items={events.data} />
    </div>
  );
}
