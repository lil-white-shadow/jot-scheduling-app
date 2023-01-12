import { Outlet, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Layout(props) {
  let bodyStyle = document.body.style;

  return(
    <div className="Header">
        <div className="navWrapper">
          <div className="headerLogo">
            {props.title}
          </div>
          <div className="navButtonGroup">
            <Link to={"/"}>
              <button className="returnHomeWrapper" onClick={() => bodyStyle.overflowY = "inherit"}>
                Home
              </button>
            </Link>
            <Link to={"/create-event"}>
              <button className={useLocation().pathname === '/create-event' ? "navActivePage" : "returnHomeWrapper"} onClick={() => bodyStyle.overflowY = "inherit"}>
                Create New Event
              </button>
            </Link>
            <Link to={"/view-all-events"}>
              <button className={useLocation().pathname === '/view-all-events' ? "navActivePage" : "returnHomeWrapper"}>
                View All Events
              </button>
            </Link>
            <Link to={"/about"}>
              <button className={useLocation().pathname === '/about' ? "navActivePage" : "returnHomeWrapper"} onClick={() => bodyStyle.overflowY = "inherit"}>
              About
              </button>
            </Link>
          </div>
        </div>
      <Outlet />
    </div>
  )
}