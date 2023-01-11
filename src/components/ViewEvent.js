import { useState, useEffect } from "react";

export default function ViewEvent(props) {

  const [currentEvent, setCurrentEvent] = useState([]);

  const [userName, setUserName] = useState('');
  const [availability, setAvailability] = useState(undefined);
  const [guestStatus, setGuestStatus] = useState('off');

  const [availableUsers, setAvailableUsers] = useState([]);
  const [specialInvitees, setSpecialInvitees] = useState([]);
  const [unavailableUsers, setUnavailableUsers] = useState([]);

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

      let availableArray = availableUsers.filter(name => name !== formInputs.userName.toUpperCase());
      let specialInviteesArray = specialInvitees.filter(name => name !== formInputs.userName.toUpperCase());
      let unavailableArray = unavailableUsers.filter(name => name !== formInputs.userName.toUpperCase());

      if(formInputs.availability === 'Yes' && formInputs.guestStatus === 'off' && formInputs.userName.toUpperCase) {

        setAvailableUsers([...availableArray, formInputs.userName.toUpperCase()]);
        if(specialInvitees !== specialInviteesArray) {
          setSpecialInvitees([...specialInviteesArray]);
        }
        if(unavailableUsers !== unavailableArray) {
          setUnavailableUsers([...unavailableArray]);
        }

      } else if(formInputs.availability === 'Yes' && formInputs.guestStatus === 'on') {
        
        setSpecialInvitees([...specialInviteesArray,formInputs.userName.toUpperCase()]);

        if(availableUsers !== availableArray) {
          setAvailableUsers([...availableArray]);
        }
        if(unavailableUsers !== unavailableArray) {
          setUnavailableUsers([...unavailableArray]);
        }

      } else {

        setUnavailableUsers([...unavailableArray, formInputs.userName.toUpperCase()]);

        if(availableUsers !== availableArray) {
          setAvailableUsers([...availableArray]);
        }
        if(specialInvitees !== specialInviteesArray) {
          setSpecialInvitees([...specialInviteesArray]);
        }      
      }
  
      setUserName('');
      setAvailability(undefined);
      setGuestStatus('off');
      
      } else {
        setIsFormValid(false);
      }
  }

  // get event details
  useEffect(() => {
    fetch(props.url + "/api/events/" + props.eventId)
      .then(response => response.json())
      .then(data => {
        setCurrentEvent(data[0]);

        // DO NOT USE currentEvent.eventAttendees etc. as they still picks up empty [] from original state
        setAvailableUsers(data[0].eventAttendees);
        setSpecialInvitees(data[0].eventSpecialGuests);
        setUnavailableUsers(data[0].eventNonAttendees);
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // update event RSVP
  useEffect(() => {

    fetch(props.url + '/api/events/' + props.eventId, {
      method: 'PATCH',
      headers:{'content-type': 'application/json'},
    body: JSON.stringify({
      eventAttendees: availableUsers,
      eventSpecialGuests: specialInvitees,
      eventNonAttendees: unavailableUsers
    })
  })
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [availableUsers, specialInvitees, unavailableUsers])

  
  return(
    <div className="main main__ViewEvent">
      <h1>You've been invited!</h1>
      <div className="card">
        <h2>Event: {currentEvent.eventName}</h2>
        <div className="cardLine">
          <div className="cardLineTitle">Date: </div>
          <div className="cardLineContent">{currentEvent.eventDate}</div>
        </div>
        <div className="cardLine">
          <div className="cardLineTitle">Time: </div>
          <div className="cardLineContent">{currentEvent.eventStartTime} - {currentEvent.eventEndTime} {currentEvent.eventEndTime < "12:00" ? "am" : null}</div>
        </div>
        <div className="cardLine">
          <div className="cardLineTitle">Location: </div>
          <div className="cardLineContent">{currentEvent.eventLocation}</div>
        </div>
        <div className="cardLine">
          <div className="cardLineTitle">Host: </div>
          <div className="cardLineContent">{currentEvent.eventOrganizer}</div>
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
        <h2>You're all set &#10004;</h2>
        <div>
          Click <span onClick={() => setIsFormSubmitted(false)} style={{textDecoration: "underline", cursor:"pointer"}}>here</span> to make changes or RSVP for someone else.
        </div>
      </div>
      }
      <div className="card">
        <h2>{availableUsers.length} members & {specialInvitees.length} guest(s)</h2>
        <div className="cardLineGroup">
          <div className="cardLine cardLineVertical">
            <div className="cardLineTitle">Members: </div>
            <ul>
            {
              availableUsers.map(user => <li key={user}>{user}</li>)
            }
            </ul>
          </div>
          <div className="cardLine cardLineVertical">
            <div className="cardLineTitle">Guests: </div>
            <ul>
              {
                specialInvitees.map(user => <li key={user}>{user}</li>)
              }
            </ul>
          </div>
          <div className="cardLine cardLineVertical">
            <div className="cardLineTitle">Unavailable: </div>
            <ul>
              {
                unavailableUsers.map(user => <li key={user}>{user}</li>)
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}