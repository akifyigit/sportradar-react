import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import AddEvent from "../pages/AddEvent";

const mockStore = configureStore([]);
const store = mockStore({});

describe("AddEvent", () => {
  it("renders form inputs", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddEvent />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText("Home Team Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Away Team Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Sport")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("EuroLeague, Bundesliga, NBA, etc.")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Location / Stadium")
    ).toBeInTheDocument();
  });

  it("shows validation errors on submit with empty required fields", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddEvent />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText("Create Event"));

    expect(screen.getByText("Home Team is required")).toBeInTheDocument();
    expect(screen.getByText("Away Team is required")).toBeInTheDocument();
    expect(screen.getByText("Sport is required")).toBeInTheDocument();
    expect(screen.getByText("Date is required")).toBeInTheDocument();
    expect(screen.getByText("Time is required")).toBeInTheDocument();
  });
});
