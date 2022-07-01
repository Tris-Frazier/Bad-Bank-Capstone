
function Login() {
  
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [data, setData] = React.useState([]);
  const ctx = React.useContext(UserContext);
  

  const[loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    // fetch all accounts from API
    fetch('/account/all')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data);
      })

    setLoaded(true);
  }, [loaded]);
  console.log(data);

  function checkForMatch(email, password){
    const userInfo = document.getElementById('user-info')
    console.log(email, password)
    //initalize match
    const tempArray = data;

    // find match
    let matchFound = tempArray.filter(item => {
      if(item.email == email && item.password == password) {
        return true;
      }
    })
    //console.log('match found', matchFound)
    let wrongPassword = tempArray.filter(item => {
      if(item.email == email && item.password != password) {
        return true;
      }
    })
  
    if(matchFound.length > 0) {
      ctx.user = matchFound[0].name;
      console.log(matchFound[0].name)
      //setDisplayName(matchFound[0].name)
      //userInfo.style.visibility = "visible";
      setShow(false);
      setSuccess(true);
      setTimeout(() => {
        const navCreateAccount = document.getElementById('nav-create-account');
        const navLogin = document.getElementById('nav-login');
        const navDeposit = document.getElementById('nav-deposit');
        const navWithdraw = document.getElementById('nav-withdraw');
        const navBalance = document.getElementById('nav-balance');
        const navAllData = document.getElementById('nav-allData');
        const navLogout = document.getElementById('nav-logout');
        navCreateAccount.style.display = "none";
        navLogin.style.display = "none";
        navDeposit.style.display = "block";
        navWithdraw.style.display = "block";
        navBalance.style.display = "block";
        navAllData.style.display = "block";
        navLogout.style.display = "block";
      }, 0)
    }
    console.log(ctx.user)
    if(wrongPassword.length > 0) {
      //setStatus('Password does not match')
    }
    
  }


  return (
    <>
    <UserName name={ctx.user} />
   
    <div className="login-card">
    <Card
      txtcolor="black"
      bgcolor="warning"
      header="Login"
      status={status}
      body={
        show ? (
          <LoginForm setShow={setShow} />
        ) : (
          <LoginMessage setShow={setShow} />
        )
      }
    />
    </div>
    </>
  );

  

  function LoginForm(props) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [disabled, setDisabled] = React.useState(true);
    const allData = [];

    function handleLogin() {
      //console.log(email, password);

      if (!validate(email, "email")) return;
      if (!validate(password, "password")) return;
    
      checkForMatch(email, password);
        
    }

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
        <button
          type="submit"
          className="btn btn-light"
          onClick={handleLogin}
          disabled={disabled}
        >
          Login
        </button>
      </>
    );
  }

  function LoginMessage(props) {
    return success ? (
      <>
        <h5>Login Success</h5>
        {/* <button
          type="submit"
          className="btn btn-light"
          onClick={() => props.setShow(true)}
        >
          Logout
        </button> */}
      </>
    ) : (
      <>
        <h5>No account found</h5>
        <button
          type="submit"
          className="btn btn-light"
          onClick={() => props.setShow(true)}
        >
          Retry
        </button>
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



