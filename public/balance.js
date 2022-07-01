function Balance(props) {
  React.useEffect(() => {
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
  
  },[])

  const ctx = React.useContext(UserContext);
  const [show, setShow] = React.useState(true)
  const [status, setStatus] = React.useState('')
  const [balance, setBalance] = React.useState('')

  return (
    <>
      <UserName name={ctx.user} />
      <Card
        txtcolor="black"
        bgcolor="info"
        header="Balance"
        key={1}
        body={
          <>
            <ul className="list-group list-group-flush make-center bg-dark">
              <li className="list-group-item make-center">
                Account balance: ${balance}
              </li>
            </ul>
          </>
        }
      />
    </>
  );
}

function BalanceForm(props) {

  function handle() {
    fetch(`/account/find/${props.user.email}`)
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text)
          props.setStatus(data.balance)
          props.setBalance(data.balance)
          console.log('JSON:', data)
        } catch (err) {
          props.setStatus(text)
          console.log('err:', text)
        }
      })
  }

  return (
    <>
      User
      <br />
      <p>{props.user.email}</p>
      <button type='submit' className='btn btn-light' onClick={handle}>
        Check Balance
      </button>
    </>
  )
}
