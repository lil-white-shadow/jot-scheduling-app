import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CreateEvent from "./components/CreateEvent";
import ViewEvent from "./components/ViewEvent";

import './App.css';
import { useState } from "react";

export default function App() {
  const title = "Doodle-but-Better";

  const [newEventId, setNewEventId] = useState('');

  // all events
  const [currentEvents, setCurrentEvents] = useState([]);
  console.log(currentEvents);

  // user inputs
  const [availableUsers, setAvailableUsers] = useState([]);
  const [unavailableUsers, setUnavailableUsers] = useState([]);
  const [specialInvitees, setSpecialInvitees] = useState([]);

  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
          <Route
           path="/"
           element={<Home title={title} setNewEventId={setNewEventId} currentEvents={currentEvents}/>} />
          <Route
            path={"create-eventId=" + newEventId}
            element={<CreateEvent newEventId={newEventId} currentEvents={currentEvents} setCurrentEvents={setCurrentEvents}/>} />
          {
            currentEvents.map(event => 
              <Route key={event.eventId}
                path={"view-eventId=" + event.eventId}
                element={<ViewEvent currentEvent={currentEvents.filter(ele => ele.eventId === event.eventId)[0]} availableUsers={availableUsers} setAvailableUsers={setAvailableUsers} unavailableUsers={unavailableUsers} setUnavailableUsers={setUnavailableUsers} specialInvitees={specialInvitees} setSpecialInvitees={setSpecialInvitees} />}
               />
            )
          }
      </Routes>
    </BrowserRouter>
    </div>
  );
}
