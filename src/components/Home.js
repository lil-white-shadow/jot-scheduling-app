import { Link } from "react-router-dom";


export default function Home(props) {

  function generateRandomId() {
    
    let id = Math.floor(Math.random() * 100000 + 10000);
    
    for (var i = 0; i < 5; i++) {
      let chars = "abcdefghijklmnopqrstuvwxyz0123456789";
      id = id + chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
  }

  let newEventId = generateRandomId();
  
  return ( 
    <div className="Home">
      <div className="logo">
        {props.title}
      <div className="tagline">Like doodle but better</div>
      </div>
      <div className="buttonGroup">
        <button>View current events</button>
        <button>Create new event</button>
      </div>
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
      <div>
        <h2>Click below to schedule a new event.</h2>
        <Link to={"create-eventId=" + newEventId}>
          <button onClick={() => {props.setNewEventId(newEventId)}}>Get started</button>
        </Link>
      </div>
    </div>
   );
}
