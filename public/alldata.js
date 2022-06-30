function AllData() {
  const [data, setData] = React.useState([]);
  const [view1, setView1] = React.useState(false);

  /**
   * notes
   * add the view1 logic and buttons back
   */
  

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
  }, [loaded]);

  const spinner =  <h1>Loading...</h1>;


  console.log(view1)
  
// return for AllData()
  return (
    <>
      <div>
        <h5>All Data in Store:</h5>
        {JSON.stringify(data)}
      </div>
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
                  <li className="list-group-item password">
                    Password: {user.password}
                  </li>
                  <li className="list-group-item">
                    Account balance: ${user.balance}
                  </li>
                </ul>
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Number of transactions:
                    <span className="badge bg-dark rounded-pill">
                      {!user.movements ? 0 : user.movements.length}
                    </span>
                  </li>
                </ul>
                {!user.movements ? (
                  <br />
                ) : (
                  user.movements.map(function (movement, i) {
                    return (
                      <ul className="movements-list" key={`${movement.type}-${i}`}>
                        <li
                          className={`list-group-item movement ${
                            movement.type === "deposit" ? "deposit" : "withdraw"
                          }`}
                        >
                          <span>{movement.date}</span>{" "}
                          <span>{movement.type.toUpperCase()}</span>{" "}
                          <span>${movement.amount}</span>
                        </li>
                      </ul>
                    );
                  })
                )}
              </>
            }
          />
          );
        })))
        : 
        (spinner)
      }
    </>
  )
}
