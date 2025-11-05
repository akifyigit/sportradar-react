import React from "react";
import { useNavigate } from "react-router-dom";

const sportColors = {
  football: "bg-blue-100 text-blue-800",
  basketball: "bg-green-100 text-green-800",
  tennis: "bg-yellow-100 text-yellow-800",
  "formula 1": "bg-orange-100 text-orange-800",
  default: "bg-gray-100 text-gray-800",
};

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const sportKey = (event.sport || "").toLowerCase();
  const colorClass = sportColors[sportKey] || sportColors.default;

  return (
    <div
      className={`rounded px-2 py-1 text-xs font-medium cursor-pointer ${colorClass}`}
      onClick={() => navigate(`/event/${event.id}`)}
    >
      <div className="truncate font-medium">
        {event.homeTeam?.name} vs {event.awayTeam?.name}
      </div>

      {event.result && (
        <div className="text-[11px] font-semibold mt-1">
          {event.result.homeGoals} - {event.result.awayGoals}
        </div>
      )}

      <div className="text-[10px] text-gray-600 mt-1">
        {event.originCompetitionName}
      </div>
    </div>
  );
};

export default EventCard;
