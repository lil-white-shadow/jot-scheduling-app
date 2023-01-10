export default function Header(props) {
  return(
    <div className="Header">
        <div className="headerLogo">
          {props.title}
      </div>
    </div>
  )
}