import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CreateEvent from "./components/CreateEvent";
import './App.css';
import { useState } from "react";

export default function App() {
  const title = "Doodle-but-Better";

  const [newEventId, setNewEventId] = useState('');
  const [eventName, setEventName] = useState('Volleyball');
  const [eventDate, setEventDate] = useState(new Date().toLocaleDateString());
  const [eventStartTime, setEventStartTime] = useState('07:30');
  const [eventEndTime, setEventEndTime] = useState('09:00');
  const [eventLocation, setEventLocation] = useState('The Club at Prairie Stone, Hoffman Estates');

  return (
    <div>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home title={title} setNewEventId={setNewEventId}/>} />
          <Route
          /*  path={"eventId=" + newEventId} */
          // temp route for dev
           path="event"
           element={<CreateEvent newEventId={newEventId} eventName={eventName} setEventName={setEventName} eventDate={eventDate} setEventDate={setEventDate} eventStartTime={eventStartTime} setEventStartTime={setEventStartTime} eventEndTime={eventEndTime} setEventEndTime={setEventEndTime} eventLocation={eventLocation} setEventLocation={setEventLocation}/>} />
      </Routes>
    </BrowserRouter>
    <div>Parent: {newEventId}</div>
    </div>
  );
}
