import { Link } from "react-router-dom";

export default function CreateEvent(props) {

  let formInputs = {
    "eventOrganizer": props.eventOrganizer,
    "eventName": props.eventName,
    "eventDate": props.eventDate,
    "eventStartTime": props.eventStartTime,
    "eventEndTime": props.eventEndTime,
    "eventLocation": props.eventLocation
  }

  function onSubmit(e) {
    e.preventDefault();
    console.log(formInputs);
  }
  return (
    <div>
      <h1>Your event id is {props.newEventId}</h1>
      <h2>Enter Event Information</h2>
      <form onSubmit={onSubmit} noValidate>
        <div>
          <label htmlFor="eventOrganizer">Your Name: </label>
          <input type="text" name="eventOrganizer" defaultValue={props.eventOrganizer} onChange={e => props.setEventOrganizer(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="eventName">Event Name: </label>
          <input type="text" name="eventName" defaultValue={props.eventName} onChange={e => props.setEventName(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="eventDate">Date: </label>
          <input type="date" name="eventDate" defaultValue={props.eventDate} onChange={e => props.setEventDate(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="eventStartTime">Start: </label>
          <input type="time" name="eventStartTime" defaultValue={props.eventStartTime} onChange={e => props.setEventStartTime(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="eventEndTime">End: </label>
          <input type="time" name="eventEndTime" defaultValue={props.eventEndTime} onChange={e => props.setEventEndTime(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="eventLocation">Location: </label>
          <input type="address" name="eventLocation" defaultValue={props.eventLocation} onChange={e => props.setEventLocation(e.target.value)}/>
        </div>
        <button type="submit">Create</button>
      </form>
      {/* <Link to={"/view-eventId=" + props.newEventId}> */}
      <Link to={"/view-event"}>
        <button>View event</button>
      </Link>
    </div>
  )
}
