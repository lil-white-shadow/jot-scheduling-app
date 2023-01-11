import { Outlet, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Layout(props) {
  console.log(useLocation().pathname);
  return(
    <div className="Header">
        <div className="navWrapper">
          <div className="headerLogo">
            {props.title}
          </div>
          <div className="navButtonGroup">
            <button className="returnHomeWrapper">
              <Link to={"/"}>Home</Link>
            </button>
            <button className={useLocation().pathname === '/create-event' ? "navActivePage" : "returnHomeWrapper"}>
              <Link to={"/create-event"}>Create New Event</Link>
            </button>
            <button className={useLocation().pathname === '/view-all-events' ? "navActivePage" : "returnHomeWrapper"}>
              <Link to={"/view-all-events"}>View All Events</Link>
            </button>
            <button className={useLocation().pathname === '/about' ? "navActivePage" : "returnHomeWrapper"}>
              <Link to={"/about"}>About</Link>
            </button>
          </div>
        </div>
      <Outlet />
    </div>
  )
}