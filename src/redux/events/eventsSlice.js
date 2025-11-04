import { createSlice } from "@reduxjs/toolkit";
import data from "../../data/sportsData.json";

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    events: data,
    filtered: data,
  },
  reducers: {
    filterBySport: (state, action) => {
      state.filtered = state.events.filter(
        (event) => event.sport === action.payload
      );
    },
  },
});

export const filteredEventsSelector = (state) => state.events.filtered;
export const { filterBySport } = eventsSlice.actions;
export default eventsSlice.reducer;
