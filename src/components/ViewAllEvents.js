import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ViewAllEvents(props) {

  const [currentEvents, setCurrentEvents] = useState([]);

  useEffect(() => {
    fetch(props.url + "/api/events")
      .then(response => response.json())
      .then(data => setCurrentEvents(data))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
  <div className="main main__ViewCurrentEvents card">
      <h1>{currentEvents.length} Events in progress</h1>
      <div className="cardLineGroup">
        {
          currentEvents.map(event =>
            <div key={event.eventId} className="cardLine">
              <span className="cardLineTitle">
              {event.eventId} - {event.eventName} on {event.eventDate} by {event.eventOrganizer}
              </span>
              <button className="goToButton">
              <Link to={"/view-eventId=" + event.eventId}>
                Go to event
                &nbsp;
                <div className="goToArrow">&#8627;</div>
              </Link>
              </button>
            </div>
          )
        }
      </div>
  </div>
  )
}