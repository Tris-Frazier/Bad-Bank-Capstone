function Login() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [emailMatch, setEmailMatch] = React.useState(false);
  const [passwordMatch, setPasswordMatch] = React.useState(false);
  const ctx = React.useContext(UserContext);

  //return <h1 className="feature-coming-soon">Feature Coming Soon...</h1>;

  return (
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
  );

  function LoginForm(props) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [disabled, setDisabled] = React.useState(true);

    function handleLogin() {
      console.log(email, password);

      if (!validate(email, "email")) return;

      if (!validate(password, "password")) return;

      setShow(false);
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
        <button
          type="submit"
          className="btn btn-light"
          onClick={() => props.setShow(true)}
        >
          Logout
        </button>
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

    ctx.users.map((user) => {
      if (field == user.email) {
        setEmailMatch(true);
      }
      if (field == user.password) {
        setPasswordMatch(true);
      }
    });

    checkForMatch();
    if (emailMatch && passwordMatch) {
      setSuccess(true);
    }
    console.log("email match: " + emailMatch);
    console.log("password match:" + passwordMatch);
    console.log("success: " + success);
    return true;
  }
}

function checkForMatch(){
  ctx.users.map((user)=>{
    if (field == user.email) {
      setEmailMatch(true);
    }
    if (label == user.email) {
      setEmailMatch(true);
    }
  })
}
