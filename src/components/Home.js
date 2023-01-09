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
    <div>
      <h1>Welcome to {props.title}</h1>
      <div>
        <h2>There are currently {props.currentEvents.length} events in progress.</h2>
        {
          props.currentEvents.map(event =>
            <div key={event.eventId}>
              <h3>
                {event.eventName} on {event.eventDate} by {event.eventOrganizer} [Id: {event.eventId}]
              </h3>
              <Link to={"/view-eventId=" + event.eventId}>
                <button>View event</button>
              </Link>
            </div>
          )
        }
      </div>
      <div>
        <h2>Click below to schedule your next event!</h2>
        <Link to={"create-eventId=" + newEventId}>
          <button onClick={() => {props.setNewEventId(newEventId)}}>Get started</button>
        </Link>
      </div>
    </div>
   );
}
