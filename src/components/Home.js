import { Link } from "react-router-dom";

function Home(props) {

  function generateRandomId() {
    
    let id = Math.floor(Math.random() * 100000 + 10000);
    
    for (var i = 0; i < 5; i++) {
      let chars = "abcdefghijklmnopqrstuvwxyz0123456789";
      id = id + chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
  }

  let newEventId = generateRandomId();
  
  return ( 
    <div>
      <h1>Welcome to {props.title}</h1>
      <h2>Click below to schedule your next event!</h2>
      {/* <button onClick={() => {props.setNewEventId(newEventId)}}>Get started</button> */}
      <Link to="event">
        <button onClick={() => {props.setNewEventId(newEventId)}}>Get started</button>
      </Link>
    </div>
   );
}

export default Home;