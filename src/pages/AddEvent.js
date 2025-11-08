import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEvent } from "../redux/events/eventsSlice";
import { useNavigate } from "react-router-dom";

// basit slugify
const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

const popularSports = [
  "Football",
  "Basketball",
  "Tennis",
  "Baseball",
  "Volleyball",
];

export default function AddEvent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [sport, setSport] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [broadcast, setBroadcast] = useState("");
  const [homeCountry, setHomeCountry] = useState("");
  const [awayCountry, setAwayCountry] = useState("");
  const [stage, setStage] = useState("GROUP_STAGE");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    let formErrors = {};
    if (!homeTeam.trim()) formErrors.homeTeam = "Home Team is required";
    if (!awayTeam.trim()) formErrors.awayTeam = "Away Team is required";
    if (!sport) formErrors.sport = "Sport is required";
    if (!date) formErrors.date = "Date is required";
    if (!time) formErrors.time = "Time is required";

    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) return;

    const newEvent = {
      season: new Date().getFullYear(),
      status: "upcoming",
      timeVenueUTC: time,
      dateVenue: date,
      stadium: location || null,
      homeTeam: {
        name: homeTeam,
        officialName: homeTeam,
        slug: slugify(homeTeam),
        abbreviation: homeTeam
          .split(" ")
          .map((w) => w[0])
          .join("")
          .toUpperCase(),
        teamCountryCode: homeCountry || null,
        stagePosition: null,
      },
      awayTeam: {
        name: awayTeam,
        officialName: awayTeam,
        slug: slugify(awayTeam),
        abbreviation: awayTeam
          .split(" ")
          .map((w) => w[0])
          .join("")
          .toUpperCase(),
        teamCountryCode: awayCountry || null,
        stagePosition: null,
      },
      stage: {
        id: stage,
        name: stage,
        ordering: 1,
      },
      broadcast: broadcast || null,
      result: null,
      group: null,
      originCompetitionId: "user-events",
      originCompetitionName: "User Added Event",
      sport: slugify(sport),
      createdByUser: true,
    };

    // ID oluştur
    newEvent.id = `${newEvent.originCompetitionId}-${newEvent.stage.id}-${newEvent.homeTeam.slug}-${newEvent.awayTeam.slug}-${newEvent.dateVenue}`;

    dispatch(addEvent(newEvent));
    navigate("/"); // redirect
  };

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <p className="text-gray-800 text-3xl sm:text-4xl font-black leading-tight">
            Create a New Sports Event
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Teams */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="flex flex-col">
                <p className="text-gray-800 text-sm font-medium pb-2">
                  Home Team
                </p>
                <input
                  className="form-input w-full rounded-lg border px-4 py-2 text-gray-900"
                  placeholder="Home Team Name"
                  value={homeTeam}
                  onChange={(e) => setHomeTeam(e.target.value)}
                />
                {errors.homeTeam && (
                  <p className="text-red-500 text-xs mt-1">{errors.homeTeam}</p>
                )}
              </label>

              <label className="flex flex-col">
                <p className="text-gray-800 text-sm font-medium pb-2">
                  Away Team
                </p>
                <input
                  className="form-input w-full rounded-lg border px-4 py-2 text-gray-900"
                  placeholder="Away Team Name"
                  value={awayTeam}
                  onChange={(e) => setAwayTeam(e.target.value)}
                />
                {errors.awayTeam && (
                  <p className="text-red-500 text-xs mt-1">{errors.awayTeam}</p>
                )}
              </label>
            </div>

            {/* Sport, Date, Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="flex flex-col">
                <p className="text-gray-800 text-sm font-medium pb-2">Sport</p>
                <select
                  className="form-select w-full rounded-lg border px-4 py-2 text-gray-900"
                  value={sport}
                  onChange={(e) => setSport(e.target.value)}
                >
                  <option value="">Select Sport Type</option>
                  {popularSports.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {errors.sport && (
                  <p className="text-red-500 text-xs mt-1">{errors.sport}</p>
                )}
              </label>

              <label className="flex flex-col">
                <p className="text-gray-800 text-sm font-medium pb-2">Date</p>
                <input
                  type="date"
                  className="form-input w-full rounded-lg border px-4 py-2 text-gray-900"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                {errors.date && (
                  <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                )}
              </label>

              <label className="flex flex-col">
                <p className="text-gray-800 text-sm font-medium pb-2">
                  Start Time
                </p>
                <input
                  type="time"
                  className="form-input w-full rounded-lg border px-4 py-2 text-gray-900"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
                {errors.time && (
                  <p className="text-red-500 text-xs mt-1">{errors.time}</p>
                )}
              </label>
            </div>

            {/* Location */}
            <div>
              <label className="flex flex-col">
                <p className="text-gray-800 text-sm font-medium pb-2">
                  Location
                </p>
                <input
                  className="form-input w-full rounded-lg border px-4 py-2 text-gray-900"
                  placeholder="Location / Stadium"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </label>
            </div>

            {/* Broadcast, Stage, Home/Away Country */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="flex flex-col">
                <p className="text-gray-800 text-sm font-medium pb-2">
                  Broadcast
                </p>
                <input
                  className="form-input w-full rounded-lg border px-4 py-2 text-gray-900"
                  placeholder="Broadcast (optional)"
                  value={broadcast}
                  onChange={(e) => setBroadcast(e.target.value)}
                />
              </label>

              <label className="flex flex-col">
                <p className="text-gray-800 text-sm font-medium pb-2">Stage</p>
                <input
                  className="form-input w-full rounded-lg border px-4 py-2 text-gray-900"
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="flex flex-col">
                <p className="text-gray-800 text-sm font-medium pb-2">
                  Home Team Country
                </p>
                <input
                  className="form-input w-full rounded-lg border px-4 py-2 text-gray-900"
                  placeholder="e.g., USA"
                  value={homeCountry}
                  onChange={(e) => setHomeCountry(e.target.value)}
                />
              </label>

              <label className="flex flex-col">
                <p className="text-gray-800 text-sm font-medium pb-2">
                  Away Team Country
                </p>
                <input
                  className="form-input w-full rounded-lg border px-4 py-2 text-gray-900"
                  placeholder="e.g., ESP"
                  value={awayCountry}
                  onChange={(e) => setAwayCountry(e.target.value)}
                />
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                className="px-6 py-2 rounded-lg border text-gray-700 hover:bg-gray-100"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-blue-700 text-white border hover:bg-primary/90"
              >
                Create Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
