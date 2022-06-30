function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  

  return (
    <div className='CreateAccountPage'>
    <div id="userInfo"></div>
      <Card
        txtcolor="white"
        bgcolor="secondary"
        header="Create Account"
        status={status}
        body={
          show ? (
            <CreateAccountForm setShow={setShow} />
          ) : (
            <CreateMessage setShow={setShow} />
          )
        }
      />
    </div>
  );

  function CreateAccountForm(props) {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [disabled, setDisabled] = React.useState(true);
    

    function handleCreate() {
    console.log('handle create fired');
      
      // validate field requirements are met
      if (!validate(name, "name")) return;
      if (!validate(email, "email")) return;
      if (!validate(password, "password")) return;
      
      //display name on page
      let userInfo = document.getElementById("userInfo");
      userInfo.innerHTML = `Welcome, ${name}`;
      userInfo.style.visibility = "visible";

      // create user
      const url = `/account/create/${name}/${email}/${password}`;
      (async () => {
        var res = await fetch(url);
        // console.log(res);
        // if(res == 'User already exists. Please login.'){
        //   document.getElementById('status').innerHTML = 'User already exists. Please login.';
        //   document.getElementById('status-btn').innerHTML = 'Create new account';
        // }
        var data = await res.json();
        console.log(data);
      })();
      props.setShow(false);
    }

    return (
      <>
        Name
        <br />
        <input
          type="input"
          className="form-control"
          id="name"
          placeholder="Enter name"
          value={name}
          onChange={(e) => {
            setName(e.currentTarget.value);
            setDisabled(false);
          }}
        />
        <br />
        Email address
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
          onClick={handleCreate}
          disabled={disabled}
        >
          Create Account
        </button>
      </>
    );
  }

  function CreateMessage(props) {
    return (
      <>
        <h5 id="status">Success</h5>
        <button
          type="submit"
          className="btn btn-light"
          id="status-btn"
          onClick={() => props.setShow(true)}
        >
          Add another account
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
    if (label === "password" && field.length < 8) {
      setStatus("Error: " + label + " must be at least 8 characters");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }
}
