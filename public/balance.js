function Balance(props) {
  const ctx = React.useContext(UserContext);
  const [show, setShow] = React.useState(true)
  const [status, setStatus] = React.useState('')
  const [balance, setBalance] = React.useState('')

  return (
    <Card
      txtcolor="black"
      bgcolor="info"
      header="Balance"
      key={ctx.users[0].name}
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
