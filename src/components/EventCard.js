import React from "react";

const EventCard = ({ event }) => {
  console.log(event);
  return (
    <div className="group relative cursor-pointer truncate rounded bg-blue-100 dark:bg-blue-900/50 px-2 py-1 text-xs font-medium text-blue-800 dark:text-blue-200">
      <span className="absolute left-1 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-blue-500"></span>
      <span className="pl-2">
        {event.homeTeam?.name} vs. {event.awayTeam?.name}
      </span>
    </div>
  );
};

export default EventCard;
