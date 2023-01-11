import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Layout(props) {
  return(
    <div className="Header">
        <div className="headerLogo">
          {props.title}
        </div>
        <button className="returnHomeWrapper">
          <Link to={"/"}>Return home</Link>
        </button>
      <Outlet />
    </div>
  )
}