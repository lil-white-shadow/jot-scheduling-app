import { Link } from "react-router-dom";

export default function About() {
  return(
    <div className="main">
      <h1>Our Promise</h1>
      <p><b>JOT</b> is the easiest way on the internet to schedule your next event. While designed for simplicity, it has all the features you have ever wanted and none of the clutter like some other applications.</p>
      <p>
        If you insist on creating an account and giving your email, phone or credit card information, then <b>JOT</b> is <span style={{textDecoration: "underline"}}>not</span> for you.
      </p>
      <p>
        Yes, you read that right, what are you waiting for? Let's get your next party scheduled...
      </p>
      <Link to={"/create-event"}>
          <button className="returnHomeWrapper specialButton" style={{marginTop: "2rem"}}>
            Create New Event
          </button>
      </Link>
    </div>
  )
}