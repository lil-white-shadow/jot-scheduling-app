import { Outlet } from "react-router-dom";

export default function Layout(props) {
  return(
    <div className="Header">
        <div className="headerLogo">
          {props.title}
      </div>
      <Outlet />
    </div>
  )
}