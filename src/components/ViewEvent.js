import { useState } from "react";

export default function ViewEvent(props) {
  const [userName, setUserName] = useState('');
  const [availability, setAvailability] = useState(undefined);
  const [guestStatus, setGuestStatus] = useState('off');

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  let formInputs = {
    "userName": userName,
    "availability": availability,
    "guestStatus": guestStatus
  }
  
  function onSubmit(e) {
    e.preventDefault();

    if(formInputs.availability === 'Yes' && formInputs.guestStatus === 'off') {
      props.setAvailableUsers([...props.availableUsers, formInputs.userName])
    } else if(formInputs.availability === 'Yes' && formInputs.guestStatus === 'on') {
      props.setSpecialInvitees([...props.specialInvitees,formInputs.userName])
    } else {
      props.setUnavailableUsers([...props.unavailableUsers, formInputs.userName])
    }

    setUserName('');
    setAvailability(undefined);
    setGuestStatus('off');

    setIsFormSubmitted(true);
  }
  return(
    <div>
      <h1>You've been invited!</h1>
      <div>
        <h2>Event: {props.currentEvent.eventName}</h2>
        <p>Date: {props.currentEvent.eventDate}</p>
        <p>Time: {props.currentEvent.eventStartTime} - {props.currentEvent.eventEndTime}</p>
        <p>Location: {props.currentEvent.eventLocation}</p>
        <p>Organized by: {props.currentEvent.eventOrganizer}</p>
      </div>
      {
        !isFormSubmitted ? 
        <div>
        <h2>Please enter your name and availability below.</h2>
        <form onSubmit={onSubmit} noValidate>
          <div>
            <label htmlFor="userName">Name: </label>
            <input type="text" name="userName" onChange={e => setUserName(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="availability">Are you available: </label>
            <select name="availability" onChange={e => setAvailability(e.target.value)} defaultValue="">
              <option disabled value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div>
            <label htmlFor="guestStatus">Are you a guest?: </label>
            <input type="checkbox" name="guestStatus" onChange={e => setGuestStatus(e.target.value)}/>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      : null
      }

      <h2>Who is going --&gt; {props.availableUsers.length} members & {props.specialInvitees.length} guest(s)</h2>
      <div>
        <h4>Available Members: </h4>
        <ul>
        {
          props.availableUsers.map(user => <li key={user}>{user}</li>)
        }
        </ul>
        <h4>Special Guests:</h4>
        <ul>
          {
            props.specialInvitees.map(user => <li key={user}>{user}</li>)
          }
        </ul>
        <h4>Unavailable Members / Invitees: </h4>
        <ul>
          {
            props.unavailableUsers.map(user => <li key={user}>{user}</li>)
          }
        </ul>
      </div>
    </div>
  )
}