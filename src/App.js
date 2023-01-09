import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CreateEvent from "./components/CreateEvent";
import './App.css';
import { useState } from "react";

export default function App() {
  const title = "Doodle-but-Better";

  const [newEventId, setNewEventId] = useState('');

  return (
    <div>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home title={title} setNewEventId={setNewEventId}/>} />
          <Route path="event" element={<CreateEvent title={title} newEventId={newEventId}/>} />
      </Routes>
    </BrowserRouter>
    <div>Parent: {newEventId}</div>
    </div>
  );
}
