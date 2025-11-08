import React from "react";
import { useNavigate } from "react-router-dom";
import SearchableSelectBox from "../components/SearchableSelectBox";
import { useSelector } from "react-redux";
import { filteredEventsSelector } from "../redux/events/eventsSlice";

export default function TopBar() {
  const navigate = useNavigate();
  const events = useSelector(filteredEventsSelector);

  return (
    <header className="flex h-16 items-center z-10 justify-between border-b border-gray-200 bg-white px-4 md:px-6">
      {/* Search Box */}
      <div className="flex-1 px-4">
        <SearchableSelectBox
          items={events.data.map((ev, idx) => ({
            ...ev,
            id: `${ev.originCompetitionId ?? "user-events"}-${
              ev.stage?.id ?? "NA"
            }-${ev.homeTeam?.slug ?? "home"}-${ev.awayTeam?.slug ?? "away"}-${
              ev.dateVenue ?? "TBD"
            }-${idx}`,
          }))}
          onSelect={(item, resetInput) => {
            navigate(`/event/${item.id}`);
            resetInput();
          }}
          placeholder="Search events..."
        />
      </div>
    </header>
  );
}
