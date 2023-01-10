import { Link } from "react-router-dom";

export default function ViewCurrrentEvents(props) {
  return (
  <div className="main main__ViewCurrentEvents card">
      <h1>{props.currentEvents.length} Events in progress</h1>
      <div className="cardLineGroup">
        {
          props.currentEvents.map(event =>
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