import { useState } from "react";
import { Link } from "react-router-dom";

export default function CreateEvent(props) {
  
  const [isFormValid, setIsFormValid] = useState(true);
  const [isEventCreated, setIsEventCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [eventTemplate, setEventTemplate] = useState(0);

  const defaultEventInputs = {
    "eventOrganizer": '',
    "eventName": '',
    "eventDate": new Date().toLocaleDateString(),
    "eventStartTime": '07:30',
    "eventEndTime": '09:00',
    "eventLocation": '',
    "eventAttendees": [],
    "eventSpecialGuests": [],
    "eventNonAttendees": []
  }

  const [currentEventInputs, setCurrentEventInputs] = useState(defaultEventInputs);

  function generateRandomId() {
    
    let id = Math.floor(Math.random() * 100 + 100);
    
    for (var i = 0; i < 5; i++) {
      let chars = "abcdefghijklmnopqrstuvwxyz0123456789";
      id = id + chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
  }

  function postNewEvent(arg) {
    fetch(props.url + '/api/new-event', {
      method: 'POST',
      headers:{'content-type': 'application/json'},
      body: JSON.stringify({
        eventId: arg,
        eventDate: currentEventInputs.eventDate,
        eventName: currentEventInputs.eventName,
        eventStartTime: currentEventInputs.eventStartTime,
        eventEndTime: currentEventInputs.eventEndTime,
        eventLocation: currentEventInputs.eventLocation,
        eventOrganizer: currentEventInputs.eventOrganizer,
        eventAttendees: currentEventInputs.eventAttendees,
        eventSpecialGuests: currentEventInputs.eventSpecialGuests,
        eventNonAttendees: currentEventInputs.eventNonAttendees
      })
    })
      .then(() => {
        
        props.setNewEventId(arg);

        setTimeout(() => {
          setIsLoading(false);
          setIsEventCreated(true);
        }, 3000)
      });
  }

  function onSubmit(e) {
    e.preventDefault();

    if(currentEventInputs.eventOrganizer !== "" && 
      currentEventInputs.eventName !== "" &&
      currentEventInputs.eventDate !== "" &&
      currentEventInputs.eventStartTime !== "" &&
      currentEventInputs.eventEndTime !== "" &&
      currentEventInputs.eventLocation !== "") {
      
      setIsLoading(true);
      let newId = generateRandomId();
      postNewEvent(newId);
      
      // DO NOT USE postNewEvent(props.newEventId) as that still picks up empty string from original value set in App.js
      
      props.setAllEventIds = [...props.setAllEventIds, newId]
    
    } else {

      setIsFormValid(false)
    }
  }

  return (
    <div className="main main__CreateEvent">
      {
        !isEventCreated ?
        <div>
        <h1>Enter Event Details</h1>
        <form onSubmit={onSubmit} noValidate>
          <div>
          <label htmlFor="eventTemplate">Event Template: </label>
            <select name="availability" onChange={e => setEventTemplate(e.target.value)} defaultValue="" style={{width: "200px"}}>
                  <option disabled value="">Select</option>
                  <option value={0}>None</option>
                  <option value={1}>Tigers Volleyball</option>
            </select>
          </div>
          <div>
            <label htmlFor="eventOrganizer">Your Name: </label>
            <input type="text" name="eventOrganizer" defaultValue={eventTemplate === "1" ? "Bhavin" : null} onChange={e => setCurrentEventInputs(Object.assign({}, currentEventInputs, {eventOrganizer:(e.target.value)}))}/>
          </div>
          <div>
            <label htmlFor="eventName">Event Name: </label>
            <input type="text" name="eventName" defaultValue={eventTemplate === "1" ? "Volleyball" : null} onChange={e => setCurrentEventInputs(Object.assign({}, currentEventInputs, {eventName:(e.target.value)}))}/>
          </div>
          <div>
            <label htmlFor="eventDate">Date: </label>
            <input type="date" name="eventDate" defaultValue={defaultEventInputs.eventDate} onChange={e => setCurrentEventInputs(Object.assign({}, currentEventInputs, {eventDate:(e.target.value)}))}/>
          </div>
          <div>
            <label htmlFor="eventStartTime">Start: </label>
            <input type="time" name="eventStartTime" defaultValue={eventTemplate === "1" ? defaultEventInputs.eventStartTime : null} onChange={e => setCurrentEventInputs(Object.assign({}, currentEventInputs, {eventStartTime:(e.target.value)}))}/>
          </div>
          <div>
            <label htmlFor="eventEndTime">End: </label>
            <input type="time" name="eventEndTime" defaultValue={eventTemplate === "1" ? defaultEventInputs.eventEndTime : null} onChange={e => setCurrentEventInputs(Object.assign({}, currentEventInputs, {eventEndTime:(e.target.value)}))}/>
          </div>
          <div>
            <label htmlFor="eventLocation">Location: </label>
            <input type="address" name="eventLocation" defaultValue={eventTemplate === "1" ? "Prairie Stone" : null} onChange={e => setCurrentEventInputs(Object.assign({}, currentEventInputs, {eventLocation:(e.target.value)}))}/>
          </div>
          <button type="submit" disabled={!isFormValid}>Create</button>
          {
            isLoading ? <div id="loading"></div> : null
          }
          {
            !isFormValid ?
            <span style={{fontWeight: "700", textDecoration: "underline"}}>Error - All fields are required.</span>
            : null
          }
        </form>
      </div>
      :
      <div className="feedback">
        <h2>Success!</h2>
        <span>Your event id is <span style={{fontWeight: "700"}}>{props.newEventId}</span>. Click </span>
        <Link to={"/view-eventId=" + props.newEventId} style={{textDecoration: "underline"}}>here</Link>
        <span> to visit your event page and share it with others so they can RSVP to your event.</span>
      </div>
      }
    </div>
  )
}
