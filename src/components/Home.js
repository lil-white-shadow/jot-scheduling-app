import { Link } from "react-router-dom";

export default function Home(props) {
  return ( 
    <div className="Home">
      <div className="logo">
        {props.title}
      <div className="tagline">{props.tagline}</div>
      </div>
      <div className="buttonGroup">
        <Link to={"create-event"}>
          <button>Create New Event</button>
        </Link>
        <Link to={"view-all-events"}>
          <button>View All Events</button>
        </Link>
        <Link to={"about"}>
          <button className="aboutButton">About</button>
        </Link>
      </div>
    </div>
   );
}
