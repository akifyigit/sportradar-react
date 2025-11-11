

# Sportradar Frontend Coding Exercise – Sports Event Calendar

## Overview
This project is a sports event calendar application built for the Sportradar Frontend Coding Exercise.  
It allows users to view sports events on a calendar, see event details, and add new events during runtime.

---

## Features
- **Calendar View:** Displays current month with events marked on the corresponding days.
- **Event Detail Page:** Clicking an event shows full details, including teams, sport type, date, and time.
- **Add Event Form:** Users can add new events at runtime.
- **Responsive Design:** Works well on desktop, tablet, and mobile screens.
- **Event ID Generator:** Helper function to create unique event IDs for each event.
- **Navigation:** Simple navigation between calendar and add event page.

---

## Installation

1. Clone the repository:
```bash
   git clone https://github.com/akifyigit/sportradar-react.git
   cd sportradarreactapp
```


2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

* Navigate the calendar to see scheduled events.
* Click on an event to view details.
* Add a new event using the "Add Event" page.
  Note: Added events are not persisted across sessions.

---

## Tests

Run all tests with:

```bash
npm test
```

* Most tests pass, except `SearchableSelectBox` tests which are skipped due to placeholder/prop mismatch issues.
* Jest and React Testing Library were used for testing components and helper functions.

---



## Tech Stack

* React 18
* TailwindCSS
* React Router v6
* Jest & React Testing Library
* JavaScript (ES6+)


