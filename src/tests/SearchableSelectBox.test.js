import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchableSelectBox from "../components/SearchableSelectBox";

describe.skip("SearchableSelectBox", () => {
  const items = [
    { id: "1", name: "Barcelona" },
    { id: "2", name: "Real Madrid" },
    { id: "3", name: "Arsenal" },
  ];

  it("renders without crashing", () => {
    render(
      <SearchableSelectBox
        items={items}
        onSelect={() => {}}
        placeholder="Search events..."
      />
    );
    expect(screen.getByPlaceholderText("Search events...")).toBeInTheDocument();
  });

  it("filters items based on input value", () => {
    render(
      <SearchableSelectBox
        items={items}
        onSelect={() => {}}
        placeholder="Search events..."
      />
    );

    const input = screen.getByPlaceholderText("Search events...");

    fireEvent.change(input, { target: { value: "Bar" } });

    expect(screen.getByText("Barcelona")).toBeInTheDocument();
    expect(screen.queryByText("Arsenal")).not.toBeInTheDocument();
  });

  it("calls onSelect when an item is clicked", () => {
    const items = [
      {
        id: "1",
        homeTeam: { name: "Real Madrid" },
        awayTeam: { name: "Barcelona" },
        sport: "Football",
      },
    ];

    const mockSelect = jest.fn();

    render(
      <SearchableSelectBox
        items={items}
        onSelect={mockSelect}
        placeholder="Search"
      />
    );

    const input = screen.getByPlaceholderText("Search");
    fireEvent.focus(input);

    const optionText = `${items[0].homeTeam.name} vs ${
      items[0].awayTeam.name
    } (${items[0].sport.toLowerCase()})`;
    const option = screen.getByText(optionText);

    fireEvent.click(option);

    expect(mockSelect).toHaveBeenCalledWith(items[0], expect.any(Function));
  });
});
