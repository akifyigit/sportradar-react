import { createSlice } from "@reduxjs/toolkit";
import rawData from "../../data/sportsData.json";
const eventsJson = rawData.data;

const savedUserEvents = JSON.parse(localStorage.getItem("userEvents")) || [];

const initialState = {
  data: [...eventsJson, ...savedUserEvents],
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent: (state, action) => {
      const newEvent = action.payload;

      state.data.push(newEvent);

      const userEventsOnly = state.data.filter(
        (ev) => ev.createdByUser === true
      );
      localStorage.setItem("userEvents", JSON.stringify(userEventsOnly));
    },
  },
});

export const { addEvent } = eventsSlice.actions;

export const filteredEventsSelector = (state) => state.events;

export default eventsSlice.reducer;
