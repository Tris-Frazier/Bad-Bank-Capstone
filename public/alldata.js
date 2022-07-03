function AllData() {
  const [data, setData] = React.useState([]);
  const [view1, setView1] = React.useState(true);
  const[loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    // fetch all accounts from API
    fetch('/account/all')
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        setData(data);
      })
    setLoaded(true);

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
  }, [loaded]);

  const spinner =  <h1>Loading...</h1>;

  // did not work as expected.  Deleted all data in collection. ?????
  function handleDelete(email){
    fetch(`account/delete/${email}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
  }
  
  return (
    <>
    <div className="allData-display">
      <div className="allData-btn-container first-btn">
        <button type="button" className="btn btn-success allData-btn" onClick={() => setView1(true)}>Formatted Display</button>
      </div>
      <div className="allData-btn-container">
        <button type="button" className="btn btn-secondary allData-btn" onClick={() => setView1(false)}>JSON Display</button>
      </div>
    </div>
    {!view1 ? (
      <div className="allData-json">
        <h5>All Data in Store:</h5>
        {JSON.stringify(data)}
      </div>
      )
      :
      ( <>
      <div className="allData-cards">
        {loaded ?
          ((data.map((user, index) => {
            return (
              <Card
              txtcolor="black"
              bgcolor="info"
              header="Account Info"
              title={`Account owner: ${user.name.toUpperCase()}`}
              key={user._id}
              body={
                <>
                <ul className="list-group list-group-flush" key={index}>
                  <li className="list-group-item mongodbId">MongoDB ID: {user._id}</li>
                  <li className="list-group-item email">Email: {user.email}</li>
                  <li className="list-group-item password">Password: {user.password}</li>
                  <li className="list-group-item">Account balance: ${user.balance}</li>
                </ul>
                </>
              }/>
            );
          })))
          : 
          (spinner)
        }
      </div>
      </>)
    }
    </>
  )
}
