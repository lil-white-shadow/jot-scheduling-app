import { Link } from "react-router-dom";

export default function ViewCurrrentEvents(props) {
  return (
  <div>
      <h2>There are currently {props.currentEvents.length} events in progress.</h2>
      {
        props.currentEvents.map(event =>
          <div key={event.eventId}>
            <span>
              <Link to={"/view-eventId=" + event.eventId}>{event.eventId}</Link>
            </span>
            <span>
            : {event.eventName} on {event.eventDate} by {event.eventOrganizer}
            </span>
          </div>
        )
      }
  </div>
  )
}