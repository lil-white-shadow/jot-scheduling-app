import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Layout(props) {
  return(
    <div className="Header">
        <div className="headerLogo">
          {props.title}
        </div>
        <button className="returnHomeWrapper">
        <span>
          &#8592;
        </span>
        <Link to={"/"}>Return home</Link>
      </button>
      <Outlet />
    </div>
  )
}