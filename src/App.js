import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

import Dashboard from "./pages/Dashboard";
import EventDetails from "./pages/EventDetails";
import AddEvent from "./pages/AddEvent";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/add-Event" element={<AddEvent />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
