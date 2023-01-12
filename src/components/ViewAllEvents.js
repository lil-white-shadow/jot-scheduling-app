import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ViewAllEvents(props) {

  const [input, setInput] = useState('');
  const [currentEvents, setCurrentEvents] = useState([]);

  useEffect(() => {
    fetch(props.url + "/api/events")
      .then(response => response.json())
      .then(data => setCurrentEvents(data))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function checkInput(input) {
    if(input === props.passcode) {
      // undo blur background effect

      document.body.style.overflowY = "inherit";
      document.getElementsByClassName("cardLineGroup")[0].style.filter = "none";
      document.getElementsByClassName("cardLineGroup")[0].style.pointerEvents = "auto";
    }
  }

  function blurBackground() {
    document.body.style.overflow = "hidden";
    document.getElementsByClassName("cardLineGroup")[0].style.filter = "blur(3px)";
    document.getElementsByClassName("cardLineGroup")[0].style.pointerEvents = "none";
  }

  useEffect(() => {
    blurBackground()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  })

  useEffect(() => {
    checkInput(input);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input])

  return (
  <div className="main main__ViewCurrentEvents card">
      <h1>{currentEvents.length} Events in progress</h1>
      {
        input !== props.passcode ?
        <div className="authorizeViewAllEvents">
          <input type="password" onChange={(e)=> setInput(e.target.value)} placeholder="Enter Secret Key"/>
        </div>
        : null
      }
      <div className="cardLineGroup">
        {
          currentEvents.map(event =>
            <div key={event.eventId} className="cardLine">
              <span className="cardLineTitle">
              {event.eventId} - {event.eventName} on {event.eventDate} by {event.eventOrganizer}
              </span>
              <Link to={"/view-eventId=" + event.eventId}>
                <button className="goToButton">
                  Go to event
                </button>
              </Link>
            </div>
          )
        }
      </div>
  </div>
  )
}