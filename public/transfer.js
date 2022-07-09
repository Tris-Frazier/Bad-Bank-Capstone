function Transfer() {
    const[balance, setBalance] = React.useState("");
    const[loaded, setLoaded] = React.useState(false);
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState("");
    const ctx = React.useContext(UserContext);
  
    React.useEffect(() => {
      // get logged in user from MongoDB
      fetch(`/account/findOne/${ctx.email}`)
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text)
          setBalance(data.balance)
          console.log('JSON:', data)
        } catch (err) {
          console.log('err:', text)
        }
      })
      setLoaded(true);
    },[loaded])
    
    return (
      <>
      <div className="hi-msg">Hi, {ctx.user}</div>
      <Card
        txtcolor="white"
        bgcolor="danger"
        header="Transfer"
        status={status}
        body={
          show ? (
            <TransferForm setShow={setShow} setStatus={setStatus} />
          ) : (
            <TransferMessage setShow={setShow} setStatus={setStatus}/>
          )
        }/>
      </>
    );
  
    function TransferForm(props) {
      const [transfer, settransfer] = React.useState("");
      const [disabled, setDisabled] = React.useState(true);
      const [recipient, setRecipient] = React.useState("");
  
  
      function handleTransfer() {
        // validate amount entered into input field
        if (!validate(Number(transfer))) return;
  
        // update balance in MongoDB
        fetch(`/account/update/${ctx.email}/-${transfer}`)
        .then(response => response.text())
        .then(text => {
          try {
            const data = JSON.parse(text);
            props.setStatus(JSON.stringify(data.amount));
            props.setShow(false);
            console.log('JSON:', data);
          } catch(err) {
            props.setStatus('Transfer failed. Please try again')
            console.log('err:', text);
          }
        });
        sendToRecipient();
        
      }

      function sendToRecipient() {
        fetch(`/account/update/${recipient}/${transfer}`)
        .then(response => response.text())
        .then(text => {
          try {
            const data = JSON.parse(text);
            props.setStatus(JSON.stringify(data.amount));
            props.setShow(false);
            console.log('JSON:', data);
          } catch(err) {
            props.setStatus('Transfer failed')
            console.log('err:', text);
          }
        });
        setBalance(balance - Number(transfer));
        setShow(false);
      }
  
      return (
        <>
          <span className="balance-information">Account Balance
           ${balance} 
           </span>
          <br />
          <br />
          Send to Bad Bank Account User
          <br />
          <input  
            type="input"
            id="recipientAccount"
            className="form-control"
            placeholder="Recipient Email"
            value={recipient}
            onChange={(e) => {
                setRecipient(e.currentTarget.value);
            }}
            />
            <br />
          Transfer Amount
          <br />
          <input
            type="input"
            className="form-control"
            id="transfer"
            placeholder="Transfer Amount"
            value={transfer}
            onChange={(e) => {
              settransfer(e.currentTarget.value);
              setDisabled(false);
            }}
          />
          <br />
          <button
            type="submit"
            className="btn btn-light"
            onClick={handleTransfer}
            disabled={disabled}
          >Transfer</button>
        </>
      );
    }
  
    function TransferMessage(props) {
      return (
        <>
          <span className="balance-information">Account Balance ${balance}</span>
          <br />
          <br />
          <h5>Transfer Successful</h5>
          <button
            type="submit"
            className="btn btn-light"
            onClick={() => {props.setShow(true); props.setStatus('');}}
          >Transfer Again</button>
        </>
      );
    }
  
    function validate(transfer) {
      if (isNaN(transfer)) {
        setStatus("Error: did not enter a valid number");
        setTimeout(() => setStatus(""), 3000);
        return false;
      }
      if (transfer < 1) {
        setStatus("Error: Lowest trasferrable amount is $1");
        setTimeout(() => setStatus(""), 3000);
        return false;
      }
      return true;
    }
  }
  