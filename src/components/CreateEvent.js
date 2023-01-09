export default function CreateEvent(props) {

  let formInputs = {
    "eventName": props.eventName,
    "eventDate": props.eventDate,
    "eventStartTime": props.eventStartTime,
    "eventEndTime": props.eventEndTime,
    "eventLocation": props.eventLocation
  }

  function onSubmit(e) {
    e.preventDefault();
    console.log(formInputs)
  }
  return (
    <div>
      <h1>
        Create your event!
      </h1>
      <h2>Your event id is {props.newEventId}</h2>
      <form onSubmit={onSubmit} noValidate>
        <div>
        <label htmlFor="eventName">Name: </label>
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
    </div>
  )
}
