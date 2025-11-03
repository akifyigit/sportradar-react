import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "./events/eventsSlice";

export const store = configureStore({
  reducer: {
    events: eventsReducer,
  },
});
