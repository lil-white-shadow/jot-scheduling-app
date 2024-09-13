import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

export default function ViewEvent(props) {
  const [currentEvent, setCurrentEvent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSendingRSVP, setIsSendingRSVP] = useState(false);

  const [userName, setUserName] = useState("");
  const [availability, setAvailability] = useState(undefined);
  const [guestStatus, setGuestStatus] = useState("off");

  const [isFormValid, setIsFormValid] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const eventDate = currentEvent.eventDate;

  let formInputs = {
    userName: userName,
    availability: availability,
    guestStatus: guestStatus,
  };

  function onSubmit(e) {
    e.preventDefault();
    setIsFormSubmitted(true);

    if (formInputs.userName !== "" && formInputs.availability !== undefined) {
      setIsFormValid(true);
      setIsSendingRSVP(true);

      // request event data from server - again - to check for any updates since initial page load
      fetch(props.url + "/api/events/" + props.eventId)
        .then((response) => response.json())
        .then((data) => {
          setCurrentEvent(data[0]);
          // remove duplicate name if present in any category
          let availableArray = data[0].eventAttendees.filter(
            (name) => name !== formInputs.userName.toUpperCase()
          );
          let specialInviteesArray = data[0].eventSpecialGuests.filter(
            (name) => name !== formInputs.userName.toUpperCase()
          );
          let unavailableArray = data[0].eventNonAttendees.filter(
            (name) => name !== formInputs.userName.toUpperCase()
          );

          // add name to the applicable category
          if (formInputs.availability === "Yes") {
            if (formInputs.guestStatus === "off") {
              availableArray = [
                ...availableArray,
                formInputs.userName.toUpperCase().trim(),
              ];
            } else {
              specialInviteesArray = [
                ...specialInviteesArray,
                formInputs.userName.toUpperCase().trim(),
              ];
            }
          } else {
            unavailableArray = [
              ...unavailableArray,
              formInputs.userName.toUpperCase().trim(),
            ];
          }

          // send updated RSVP to server
          fetch(props.url + "/api/events/" + props.eventId, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              eventAttendees: availableArray,
              eventSpecialGuests: specialInviteesArray,
              eventNonAttendees: unavailableArray,
            }),
          })
            .then(() => {
              // request event data from server to update view
              fetch(props.url + "/api/events/" + props.eventId)
                .then((response) => response.json())
                .then((data) => {
                  setCurrentEvent(data[0]);
                });
            })
            .then(() => {
              setTimeout(() => setIsSendingRSVP(false), 2000);
            });

          setUserName("");
          setAvailability(undefined);
          setGuestStatus("off");
        });
    } else {
      setIsFormValid(false);
    }
  }

  // request event data on initial page load
  useEffect(() => {
    fetch(props.url + "/api/events/" + props.eventId)
      .then((response) => response.json())
      .then((data) => {
        if (data[0] !== currentEvent) {
          setCurrentEvent(data[0]);
          setTimeout(() => setIsLoading(false), 2000);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getDay(dateString) {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    const dayOfWeek = date.toLocaleString("en-us", { weekday: "long" });

    return dayOfWeek;
  }

  function getMMdd(dateString) {
    // return date.getMonth() + 1 + "/" + (date.getDate() + 1);
    return dateString.slice(5).replace("-", "/");
  }

  console.log(currentEvent);

  return (
    <>
      <Helmet>
        <title>{`${getDay(eventDate)}, ${getMMdd(eventDate)}`}</title>
      </Helmet>
      <div className="main main__ViewEvent">
        {isLoading ? (
          <div id="loading"></div>
        ) : (
          <>
            <h1>You've been invited!</h1>
            <div className="card">
              <h2>
                {currentEvent.eventName} (
                {currentEvent.eventAttendees.length +
                  currentEvent.eventSpecialGuests.length}{" "}
                attendees)
              </h2>
              <div className="cardLine">
                <div className="cardLineTitle">Date: </div>
                <div className="cardLineContent">
                  {getDay(eventDate)} ~ {eventDate}
                </div>
              </div>
              <div className="cardLine">
                <div className="cardLineTitle">Time: </div>
                <div className="cardLineContent">
                  {currentEvent.eventStartTime} - {currentEvent.eventEndTime}{" "}
                  {currentEvent.eventEndTime < "12:00" ? "am" : null}
                </div>
              </div>
              <div className="cardLine">
                <div className="cardLineTitle">Location: </div>
                <div className="cardLineContent">
                  {currentEvent.eventLocation}
                </div>
              </div>
              <div className="cardLine">
                <div className="cardLineTitle">Host: </div>
                <div className="cardLineContent">
                  {currentEvent.eventOrganizer}
                </div>
              </div>
            </div>
            {!isFormSubmitted || !isFormValid ? (
              <div>
                <form className="card" onSubmit={onSubmit} noValidate>
                  <h2>Are you attending?</h2>
                  <div className="cardLine">
                    <label htmlFor="userName" className="cardLineTitle">
                      Name:{" "}
                    </label>
                    <input
                      type="text"
                      name="userName"
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <div className="cardLine">
                    <label htmlFor="availability" className="cardLineTitle">
                      Availability:{" "}
                    </label>
                    <select
                      name="availability"
                      onChange={(e) => setAvailability(e.target.value)}
                      defaultValue=""
                    >
                      <option disabled value="">
                        Select
                      </option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div className="cardLine">
                    <label htmlFor="guestStatus" className="cardLineTitle">
                      Are you a non-member (guest)?:{" "}
                    </label>
                    <input
                      type="checkbox"
                      name="guestStatus"
                      onChange={(e) => setGuestStatus(e.target.value)}
                    />
                  </div>
                  <div className="cardLine">
                    <button type="submit">Submit</button>
                  </div>
                  {!isFormValid && isFormSubmitted ? (
                    <span
                      style={{ fontWeight: "700", textDecoration: "underline" }}
                    >
                      Error! You must enter your name & availability.
                    </span>
                  ) : null}
                </form>
              </div>
            ) : null}
            {isFormSubmitted && isFormValid && !isSendingRSVP ? (
              <div className="feedback">
                <h2>You're all set &#10004;</h2>
                <div>
                  Click{" "}
                  <span
                    onClick={() => setIsFormSubmitted(false)}
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                  >
                    here
                  </span>{" "}
                  to make changes or RSVP for someone else.
                </div>
              </div>
            ) : null}
            {isSendingRSVP ? (
              <div id="loading"></div>
            ) : (
              <div className="card">
                <h2>RSVP Details</h2>
                <div className="cardLineGroup cardLineGroupVertical">
                  <div className="cardLine cardLineVertical">
                    <div className="cardLineTitle">
                      Members - {currentEvent.eventAttendees.length}
                    </div>
                    <ul>
                      {currentEvent.eventAttendees.map((user) => (
                        <li key={user}>{user} </li>
                      ))}
                    </ul>
                  </div>
                  <div className="cardLine cardLineVertical">
                    <div className="cardLineTitle">
                      Guests - {currentEvent.eventSpecialGuests.length}
                    </div>
                    <ul>
                      {currentEvent.eventSpecialGuests.map((user) => (
                        <li key={user}>{user}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="cardLine cardLineVertical">
                    <div className="cardLineTitle">
                      Unavailable - {currentEvent.eventNonAttendees.length}
                    </div>
                    <ul>
                      {currentEvent.eventNonAttendees.map((user) => (
                        <li key={user}>{user}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
