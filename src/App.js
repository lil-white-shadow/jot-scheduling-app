import { Routes, Route, HashRouter } from "react-router-dom";
import Home from "./components/Home";
import CreateEvent from "./components/CreateEvent";
import ViewEvent from "./components/ViewEvent";
import ViewAllEvents from "./components/ViewAllEvents";
import About from "./components/About";
import PageNotFound from "./components/PageNotFound";

import "./App.css";
import { useState, useEffect } from "react";
import Layout from "./components/Layout";

export default function App() {
  const title = "Jot";
  const tagline = "Scheduling made easy";

  // const API_ENDPOINT = "http://localhost:3001";
  const API_ENDPOINT = "https://jot-backend-node.vercel.app/";

  const [newEventId, setNewEventId] = useState("");
  const [allEventIds, setAllEventIds] = useState([]);

  useEffect(() => {
    fetch(API_ENDPOINT + "/api/ids")
      .then((response) => response.json())
      .then((data) => setAllEventIds(data));
  }, [newEventId]);

  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route
            // Home Page
            index
            element={<Home title={title} tagline={tagline} />}
          />
          <Route path="/" element={<Layout title={title} />}>
            <Route
              // Create New Event Page
              path={"create-event"}
              element={
                <CreateEvent
                  url={API_ENDPOINT}
                  newEventId={newEventId}
                  setNewEventId={setNewEventId}
                  setAllEventIds={setAllEventIds}
                />
              }
            />
            <Route
              // View All Events Page
              path={"view-all-events"}
              element={
                <ViewAllEvents url={API_ENDPOINT} allEventIds={allEventIds} />
              }
            />
            {allEventIds.map((eventId) => (
              <Route
                key={eventId}
                // View event + RSVP Page with dynamic url
                path={"view-eventId=" + eventId}
                element={<ViewEvent eventId={eventId} url={API_ENDPOINT} />}
              />
            ))}
            <Route path="about" element={<About />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </HashRouter>
      <p class="signature">
        Designed with <span class="heartIcon">&hearts;</span> by Krutarth Patel
      </p>
    </div>
  );
}
