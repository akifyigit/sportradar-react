import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import EventDetails from "../pages/EventDetails";
import generateEventId from "../utils/generateEventId";

const mockStore = configureStore([]);

describe("EventDetails", () => {
  const mockEvent = {
    originCompetitionId: "comp1",
    stage: { id: "stage1", name: "Group" },
    homeTeam: { name: "Team A", slug: "team-a", teamCountryCode: "USA" },
    awayTeam: { name: "Team B", slug: "team-b", teamCountryCode: "ENG" },
    dateVenue: "2025-07-18",
    timeVenueUTC: "18:30",
    stadium: "Stadium X",
    broadcast: "TV",
    sport: "Football",
    originCompetitionName: "Premier League",
    result: { homeGoals: 2, awayGoals: 1 },
  };

  const eventsWithId = [{ ...mockEvent, id: generateEventId(mockEvent, 0) }];

  let store;

  beforeEach(() => {
    store = mockStore({ events: { data: eventsWithId } });
  });

  it("renders event details correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/event/${eventsWithId[0].id}`]}>
          <Routes>
            <Route path="/event/:id" element={<EventDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Team A vs Team B")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("Premier League")).toBeInTheDocument();
    expect(screen.getByText("Stadium X")).toBeInTheDocument();
    expect(screen.getByText("TV")).toBeInTheDocument();
    expect(screen.getByText("Football")).toBeInTheDocument();
  });

  it("shows 'Event not found' for invalid id", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/event/invalid-id"]}>
          <Routes>
            <Route path="/event/:id" element={<EventDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Event not found")).toBeInTheDocument();
  });
});
