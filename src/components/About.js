import { Link } from "react-router-dom";

export default function About() {
  return(
    <div className="main">
      <h1>Our Philosophy</h1>
      <p>We know how daunting it can be to plan an event - from booking a venue, to deciding the menu, and putting up decorations - it can feel like a neverending list of chores.  We believe that managing the guest list should be the least of your concerns when you plan an event. That's why we created <b>JOT</b>.</p>
      <p>
        <b>JOT</b> offers a streamlined approach to creating, managing, and sharing your event - all in one place. JOT is all about simplicity and ease of use. It is so simple, you don't even need to provide your phone or email. With no hoops to jump through, JOT will allow you to spend your time doing what you do best - organize the best event you possibly can.
      </p>
      <p>
        If you insist on creating an account and giving your email, phone, address, and credit card information, then <b>JOT</b> is <span style={{textDecoration: "underline"}}>not</span> for you. But if you like to keeps things simple, you'll fit right in!
      </p>
      <p>
        What are you waiting for? Click the button below and let's get your next event scheduled with <b>JOT</b>.
      </p>
      <Link to={"/create-event"}>
          <button className="returnHomeWrapper specialButton" style={{marginTop: "2rem"}}>
            Create New Event
          </button>
      </Link>
    </div>
  )
}