import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CreateEvent from "./components/CreateEvent";
import ViewEvent from "./components/ViewEvent";
import ViewCurrentEvents from "./components/ViewCurrentEvents";

import './App.css';
import { useState } from "react";
import Layout from "./components/Layout";

export default function App() {

  const title = "Jot";
  const tagline = "Like doodle but better";

  const [newEventId, setNewEventId] = useState('');

  // all events
  const [currentEvents, setCurrentEvents] = useState([]);

  // user inputs
  const [availableUsers, setAvailableUsers] = useState([]);
  const [unavailableUsers, setUnavailableUsers] = useState([]);
  const [specialInvitees, setSpecialInvitees] = useState([]);

  return (
    <div className="App">
    {/* <Header title={title} tagline={tagline} /> */}
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={<Home title={title} tagline={tagline} setNewEventId={setNewEventId} currentEvents={currentEvents}/>}
        />
        <Route path="/" element={<Layout title={title}/>}>
          <Route
            path={"create-eventId=" + newEventId}
            element={<CreateEvent newEventId={newEventId} currentEvents={currentEvents} setCurrentEvents={setCurrentEvents}/>}
          />
          <Route
            path={"view-current-events"}
            element={<ViewCurrentEvents currentEvents={currentEvents}/>}
          />
          {
            currentEvents.map(event => 
              <Route key={event.eventId}
                path={"view-eventId=" + event.eventId}
                element={<ViewEvent currentEvent={currentEvents.filter(ele => ele.eventId === event.eventId)[0]} availableUsers={availableUsers} setAvailableUsers={setAvailableUsers} unavailableUsers={unavailableUsers} setUnavailableUsers={setUnavailableUsers} specialInvitees={specialInvitees} setSpecialInvitees={setSpecialInvitees} />}
              />
            )
          }
          {/* <Route path="*" element={<PageNotFound />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}
