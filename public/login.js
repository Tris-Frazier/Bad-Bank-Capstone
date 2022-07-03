
function Login() { 
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [user, setUser] = React.useState("");
  const ctx = React.useContext(UserContext);
  
  return (
    <>
    {loaded? <div className="hi-msg">Hi, {user}</div> : <div></div>}
    
    <div className="login-card">
    <Card
      txtcolor="black"
      bgcolor="warning"
      header="Login"
      status={status}
      body={
        show ? (
          <LoginForm setUser={setUser} setShow={setShow} setStatus={setStatus} />
        ) : (
          <LoginMessage setShow={setShow} setStatus={setStatus} />
        )
      }
    />
    </div>
    </>
  );

  

  function LoginForm() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [disabled, setDisabled] = React.useState(true);

    function handleLogin() {
      //console.log(email, password);

      // validate fields
      if (!validate(email, "email")) return;
      if (!validate(password, "password")) return;
      
      // Firebase auth
      const auth = firebase.auth();
      const promise = auth.signInWithEmailAndPassword(
        email,
        password
      );
      firebase.auth().onAuthStateChanged((firebaseUser) => {
        if (firebaseUser) {
          //console.log(firebaseUser);
          //console.log(email, password);

          // get account info from MongoDB
          fetch(`/account/login/${email}/${password}`)
          .then(response => response.text())
          .then(text => {
            //console.log(text)
            try{
              const data = JSON.parse(text);
              //console.log(data)
              setShow(false);
              setUser(data.name);
              setLoaded(true);
              setSuccess(true);
              ctx.user = data.name;
              ctx.email = data.email;
              //console.log('JSON:', data); 
            } catch {
              setStatus(text);
              setTimeout(() => setStatus(""), 3000);
            }
          });
        } else {
          //error codes
          setStatus("unAuthorized User. Please create a new account.")
          setTimeout(() => setStatus(""), 3000);
        }
      });
      promise.catch((e) => {
        setSuccess(false);
        setLoaded(false);
        console.log(e.message)});       
    }

    // function handleGoogleLogin() {
    //   console.log('google login clicked');
    //   var provider = new firebase.auth.GoogleAuthProvider();
    //   firebase
    //     .auth()
    //     .signInWithPopup(provider)
    //     .then(function (result) {
    //       console.log(result);
    //       const gmail = encodeURI(result.additionalUserInfo.profile.email);
    //       console.log(gmail);
    //       fetch(`/account/login/${gmail}/${password}`)
    //       .then(response => response.text())
    //       .then((text) => {
    //         console.log(text)
    //         try{
    //           const data = JSON.parse(text);
    //           console.log(data)
    //           setShow(false);
    //           setUser(data.name);
    //           ctx = {user:data.name, email:data.email};
    //           setLoaded(true);
    //           setSuccess(true);
    //           console.log('JSON:', data); 
    //         } catch {
    //           setStatus(text);
    //           setTimeout(() => setStatus(""), 3000);
            
    //               // const url = `/account/create/${gmail}/${gmail}/${gmail}`;
    //               // await fetch(url);
    //               // const res = await fetch(`/account/login/${gmail}/${gmail}`)
    //               // const text = await res.text();
    //               // const data = JSON.parse(text);
    //               // setStatus('');
    //               // setShow(false);
    //               // setUser(data);
    //         }
    //       })
    //     })
    //     .catch(function (error) {
    //       console.log(error.code);
    //       console.log(error.message);
    //     }); 
    // }

    return (
      <>
        Email
        <br />
        <input
          type="input"
          className="form-control"
          id="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => {
            setEmail(e.currentTarget.value);
            setDisabled(false);
          }}
        />
        <br />
        Password
        <br />
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => {
            setPassword(e.currentTarget.value);
            setDisabled(false);
          }}
        />
        <br />
        <div className="login-btn">
          <button
            type="submit"
            className="btn btn-light"
            onClick={handleLogin}
            disabled={disabled}
            
          >Login</button>
        </div>
        {/* <div>
        <button
          type="submit"
          className="btn btn-light"
          onClick={handleGoogleLogin}
          disabled={disabled}
        >
          Login with Google
        </button>
        </div> */}
      </>
    );
  }

  function LoginMessage(props) {
    return success ? (
      <>
        <h5>Login Success</h5>
        <a href="#/balance/">
          <button
          type="submit"
          className="btn btn-light"
          onClick={() => props.setShow(true)}
          >Go to Account</button>
        </a>
      </>
    ) : (
      <>
        <h5>No account found</h5>
        <button
          type="submit"
          className="btn btn-light"
          onClick={() => props.setShow(true)}
        >Retry</button>
      </>
    );
  }

  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label + " is required");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }
}



