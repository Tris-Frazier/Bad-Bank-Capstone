const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const HashRouter = ReactRouterDOM.HashRouter;
const UserContext = React.createContext(null);
const DisplayContext = React.createContext(null);



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuwmyLGZ49MjzKu6R3Otg0Hm5RXx3ekB0",
  authDomain: "bad-bank-capstone-3e236.firebaseapp.com",
  projectId: "bad-bank-capstone-3e236",
  storageBucket: "bad-bank-capstone-3e236.appspot.com",
  messagingSenderId: "610694084948",
  appId: "1:610694084948:web:f4127f818eeb32c3bb30c1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function UserName(props){
  console.log(props)
  return (
    <div id='user-info'>
      <h1 className='user-info'>Hi, {props.name}</h1>
    </div>
  )
}

function Card(props) {
  function classes() {
    const bg = props.bgcolor ? " bg-" + props.bgcolor : " ";
    const txt = props.txtcolor ? " text-" + props.txtcolor : " text-white";
    return "card mb-3 " + bg + txt;
  }

  return (
    <div className={classes()} style={{ maxWidth: "25rem" }}>
      <div className="card-header">{props.header}</div>
      <div className="card-body">
        {props.title && <h5 className="card-title">{props.title}</h5>}
        {props.text && <p className="card-text">{props.text}</p>}
        {props.body}
        {props.status && <div id="createStatus">{props.status}</div>}
      </div>
    </div>
  );
}
