import { useState } from "react";

export default function ViewEvent(props) {
  const [userName, setUserName] = useState('');
  const [availability, setAvailability] = useState(undefined);
  const [guestStatus, setGuestStatus] = useState('off');

  const [isFormValid, setIsFormValid] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  let formInputs = {
    "userName": userName,
    "availability": availability,
    "guestStatus": guestStatus
  }
  
  function onSubmit(e) {
    e.preventDefault();
    setIsFormSubmitted(true);

    if(formInputs.userName !== '' && formInputs.availability !== undefined) {
      setIsFormValid(true);
      
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
      
      } else {
        setIsFormValid(false);
      }
  }
  return(
    <div className="main main__ViewEvent">
      <h1>You've been invited!</h1>
      <div className="card">
        <h2>Event: {props.currentEvent.eventName}</h2>
        <div className="cardLine">
          <div className="cardLineTitle">Date: </div>
          <div className="cardLineContent">{props.currentEvent.eventDate}</div>
        </div>
        <div className="cardLine">
          <div className="cardLineTitle">Time: </div>
          <div className="cardLineContent">{props.currentEvent.eventStartTime} - {props.currentEvent.eventEndTime} {props.currentEvent.eventEndTime < "12:00" ? "am" : null}</div>
        </div>
        <div className="cardLine">
          <div className="cardLineTitle">Location: </div>
          <div className="cardLineContent">{props.currentEvent.eventLocation}</div>
        </div>
        <div className="cardLine">
          <div className="cardLineTitle">Host: </div>
          <div className="cardLineContent">{props.currentEvent.eventOrganizer}</div>
        </div>
      </div>
      {
        !isFormSubmitted || !isFormValid ? 
        <div>
        <form className="card" onSubmit={onSubmit} noValidate>
          <h2>Are you attending?</h2>
          <div className="cardLine">
            <label htmlFor="userName" className="cardLineTitle">Name: </label>
            <input type="text" name="userName" onChange={e => setUserName(e.target.value)}/>
          </div>
          <div className="cardLine">
            <label htmlFor="availability" className="cardLineTitle">Availability: </label>
            <select name="availability" onChange={e => setAvailability(e.target.value)} defaultValue="">
              <option disabled value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="cardLine">
            <label htmlFor="guestStatus" className="cardLineTitle">Guest?: </label>
            <input type="checkbox" name="guestStatus" onChange={e => setGuestStatus(e.target.value)}/>
          </div>
          <div className="cardLine">
            <button type="submit">Submit</button></div>
            {
              !isFormValid && isFormSubmitted ?
              <span style={{fontWeight: "700", textDecoration: "underline"}}>Error! You must enter your name & availability.</span>
              : null
            }
        </form>
      </div>
      : <div className="feedback">
        <h2>You're registered &#10004;</h2>
        <div>
          Click <span onClick={() => setIsFormSubmitted(false)} style={{textDecoration: "underline", cursor:"pointer"}}>here</span> to RSVP someone else.
        </div>
      </div>
      }
      <div className="card">
        <h2>{props.availableUsers.length} members & {props.specialInvitees.length} guest(s)</h2>
        <div className="cardLineGroup">
          <div className="cardLine cardLineVertical">
            <div className="cardLineTitle">Members: </div>
            <ul>
            {
              props.availableUsers.map(user => <li key={user}>{user}</li>)
            }
            </ul>
          </div>
          <div className="cardLine cardLineVertical">
            <div className="cardLineTitle">Guests: </div>
            <ul>
              {
                props.specialInvitees.map(user => <li key={user}>{user}</li>)
              }
            </ul>
          </div>
          <div className="cardLine cardLineVertical">
            <div className="cardLineTitle">Unavailable: </div>
            <ul>
              {
                props.unavailableUsers.map(user => <li key={user}>{user}</li>)
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}