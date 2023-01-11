import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CreateEvent from "./components/CreateEvent";
import ViewEvent from "./components/ViewEvent";
import ViewCurrentEvents from "./components/ViewCurrentEvents";
import About from "./components/About";
import PageNotFound from "./components/PageNotFound";

import './App.css';
import { useState } from "react";
import Layout from "./components/Layout";

export default function App() {

  const title = "Jot";
  const tagline = "Scheduling made easy";


  const [newEventId, setNewEventId] = useState('');
  const [currentEvents, setCurrentEvents] = useState([]);

  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route
          // Home Page
          index
          element={<Home title={title} tagline={tagline} setNewEventId={setNewEventId} currentEvents={currentEvents}/>}
        />
        <Route path="/" element={<Layout title={title}/>}>
          <Route
            // Create New Event Page
            path={"create-eventId=" + newEventId}
            element={<CreateEvent newEventId={newEventId} currentEvents={currentEvents} setCurrentEvents={setCurrentEvents}/>}
          />
          <Route
            // View Current Events Page
            path={"view-current-events"}
            element={<ViewCurrentEvents currentEvents={currentEvents}/>}
          />
          {
            currentEvents.map(event => 
              <Route key={event.eventId}
                // View event + RSVP Page
                path={"view-eventId=" + event.eventId}
                element={<ViewEvent currentEvent={currentEvents.filter(ele => ele.eventId === event.eventId)[0]}
              />}
              />
            )
          }
          <Route path="about" element={<About />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}
