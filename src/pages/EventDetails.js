import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { filteredEventsSelector } from "../redux/events/eventsSlice";
import generateEventId from "../utils/generateEventId";

const EventDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const events = useSelector(filteredEventsSelector);

  const event = events.data
    .map((ev, idx) => ({ ...ev, id: generateEventId(ev, idx) }))
    .find((ev) => ev.id === id);

  if (!event) return <div className="p-6">Event not found</div>;

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-4xl flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <a onClick={() => navigate(`/`)} className="hover:text-blue-600">
            Dashboard
          </a>
          <span>/</span>

          <span className="font-medium text-gray-700">
            {event.homeTeam?.name} vs {event.awayTeam?.name}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-base text-gray-700">
            {event.originCompetitionName}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-4 rounded-xl border bg-white p-6">
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-sm text-gray-700 font-extrabold">
              {event.homeTeam?.name}
            </p>
            {event.result && (
              <p className="text-xs text-gray-600">{event.result.homeGoals}</p>
            )}
            <p className="text-xs text-gray-600">Home</p>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 font-semibold">VS</p>
          </div>

          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-sm text-gray-700 font-extrabold">
              {event.awayTeam?.name}
            </p>
            {event.result && (
              <p className="text-xs text-gray-600">{event.result.awayGoals}</p>
            )}
            <p className="text-xs text-gray-600">Away</p>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6">
          <h3 className="text-lg font-bold mb-4 text-gray-700">
            Event Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <p className="text-sm text-gray-700">Date</p>
              <p className="font-medium text-gray-800">{event.dateVenue}</p>
            </div>
            <div>
              <p className="text-sm text-gray-700">Time</p>
              <p className="font-medium text-gray-800">{event.timeVenueUTC}</p>
            </div>
            <div>
              <p className="text-sm text-gray-700">Venue</p>
              <p className="font-medium text-gray-800">
                {event.stadium || "TBD"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-700">Broadcast</p>
              <p className="font-medium text-gray-800">
                {event.broadcast || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-700">Home Team Country</p>
              <p className="font-medium text-gray-800">
                {event.homeTeam?.teamCountryCode}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-700">Away Team Country</p>
              <p className="font-medium text-gray-800">
                {event.awayTeam?.teamCountryCode}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-700">Sport</p>
              <p className="font-medium text-gray-800">{event.sport}</p>
            </div>
            <div>
              <p className="text-sm text-gray-700">Stage</p>
              <p className="font-medium text-gray-800">{event.stage?.name}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EventDetails;
