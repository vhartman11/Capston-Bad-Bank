import React  from 'react'; 
import Button from 'react-bootstrap/Button';
import Card   from 'react-bootstrap/Card';
import {UserContext} from './context';

export function Deposit() {
  const [status, setStatus]   = React.useState('');
  const [deposit, setDeposit] = React.useState('');
  const ctx = React.useContext(UserContext);

  function validate(deposit) {
    if (isNaN(parseFloat(deposit))) {
      setStatus('Error: not a number')
      setTimeout(() => setStatus(''),3000)
      setTimeout(() => setDeposit(''),3000)
    return false
    };
    if (deposit < 0.01) {
      setStatus('Format Error (example: 12.34)')
      setTimeout(() => setStatus(''),3000)
      setTimeout(() => setDeposit(''),3000)
    return false    
    };
    if (deposit < parseFloat(deposit).toFixed(2)) {
      setStatus('Format Error (example: 12.34)')
      setTimeout(() => setStatus(''),3000)
      setTimeout(() => setDeposit(''),3000)
    return false
    };
    return true
  };

  function handleDeposit() {
    if (!validate(deposit)) return
      fetch(`http://localhost:8080/account/deposit/${ctx.email}/${deposit}`)
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
            if (data.value.balance) {
              console.log('this is for deposit')
              ctx.updateBalance(data.value.balance)
            } else
              console.log('JSON:', data);
        } catch(err) {
              console.log('err:', text);
        }
      });
      setDeposit('')
  };    

  return (
    <Card style={{ width: '30rem' }} bg='success' border='success' text="dark">
      <Card.Header as="h5">Make A Deposit</Card.Header>
        <Card.Body>
          <input type="text" className="form-control" id="deposit" placeholder="Enter amount (example deposit: 12.34)" value={deposit} onChange={e => setDeposit(e.currentTarget.value)} />
          <br></br>
          <Button type="submit" className="btn btn-light" disabled={deposit.length > 0 ? false : true} onClick={handleDeposit}>Submit Deposit</Button>
          {status}
        </Card.Body>
      </Card>
  );
};