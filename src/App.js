import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CreateEvent from "./components/CreateEvent";
import ViewEvent from "./components/ViewEvent";

import './App.css';
import { useState } from "react";

export default function App() {
  const title = "Doodle-but-Better";

  // dev controls
  const [newEventId, setNewEventId] = useState('');
  const [currentEvents, setCurrentEvents] = useState([]);

  // admin inputs
  const [eventOrganizer, setEventOrganizer] = useState('Bhavin');
  const [eventName, setEventName] = useState('Volleyball');
  const [eventDate, setEventDate] = useState(new Date().toLocaleDateString());
  const [eventStartTime, setEventStartTime] = useState('07:30');
  const [eventEndTime, setEventEndTime] = useState('09:00');
  const [eventLocation, setEventLocation] = useState('The Club at Prairie Stone, Hoffman Estates');

  // user inputs
  const [availableUsers, setAvailableUsers] = useState([]);
  const [unavailableUsers, setUnavailableUsers] = useState([]);
  const [specialInvitees, setSpecialInvitees] = useState([]);

  return (
    <div>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home title={title} setNewEventId={setNewEventId} currentEvents={currentEvents}/>} />
          <Route
          /*  path={"create-eventId=" + newEventId} */
          // temp route for dev
           path="create-event"
           element={<CreateEvent currentEvents={currentEvents} setCurrentEvents={setCurrentEvents} newEventId={newEventId} eventOrganizer={eventOrganizer} setEventOrganizer={setEventOrganizer} eventName={eventName} setEventName={setEventName} eventDate={eventDate} setEventDate={setEventDate} eventStartTime={eventStartTime} setEventStartTime={setEventStartTime} eventEndTime={eventEndTime} setEventEndTime={setEventEndTime} eventLocation={eventLocation} setEventLocation={setEventLocation}/>} />
          <Route
          /*  path={"view-eventId=" + newEventId} */
          // temp route for dev
           path="view-event"
           element={<ViewEvent eventOrganizer={eventOrganizer} eventName={eventName} eventDate={eventDate} eventStartTime={eventStartTime} eventEndTime={eventEndTime} eventLocation={eventLocation} availableUsers={availableUsers} setAvailableUsers={setAvailableUsers} unavailableUsers={unavailableUsers} setUnavailableUsers={setUnavailableUsers} specialInvitees={specialInvitees} setSpecialInvitees={setSpecialInvitees} />} />
      </Routes>
    </BrowserRouter>
    <div>EventId: {newEventId}</div>
    </div>
  );
}
