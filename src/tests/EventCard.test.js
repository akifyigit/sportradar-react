// src/tests/EventCard.test.js
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import EventCard from "../components/EventCard";
import { MemoryRouter } from "react-router-dom";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("EventCard", () => {
  const event = {
    id: "1",
    homeTeam: { name: "Team A" },
    awayTeam: { name: "Team B" },
    sport: "Football",
    originCompetitionName: "Premier League",
    result: { homeGoals: 2, awayGoals: 1 },
  };

  it("renders correctly", () => {
    render(
      <MemoryRouter>
        <EventCard event={event} />
      </MemoryRouter>
    );

    expect(screen.getByText("Team A vs Team B")).toBeInTheDocument();
    expect(screen.getByText("2 - 1")).toBeInTheDocument();
    expect(screen.getByText("Premier League")).toBeInTheDocument();
  });

  it("calls navigate when clicked", () => {
    render(
      <MemoryRouter>
        <EventCard event={event} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Team A vs Team B"));
    expect(mockNavigate).toHaveBeenCalledWith(`/event/${event.id}`);
  });
});
