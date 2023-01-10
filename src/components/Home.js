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
      <div className="tagline">{props.tagline}</div>
      </div>
      <div className="buttonGroup">
        <Link to={"view-current-events"}>
          <button>View Current Events</button>
        </Link>
        <Link to={"create-eventId=" + newEventId}>
          <button onClick={() => {props.setNewEventId(newEventId)}}>Create New Event</button>
        </Link>
      </div>

    </div>
   );
}
