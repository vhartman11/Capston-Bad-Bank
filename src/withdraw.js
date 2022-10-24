import React  from 'react'; 
import Button from 'react-bootstrap/Button';
import Card   from 'react-bootstrap/Card';
import {UserContext} from './context';

export function Withdraw() {
  const [status, setStatus]         = React.useState('');
  const [withdraw, setWithdraw]     = React.useState('');
  const ctx = React.useContext(UserContext);

  function validate(withdraw) {
    if (isNaN(parseFloat(withdraw))) {
      setStatus('Error: not a number')
      setTimeout(() => setStatus(''),3000)
      setTimeout(() => setWithdraw(''),3000)
    return false
    };
    if (withdraw < 0.01) {
      setStatus('Format Error (example: 22.22)')
      setTimeout(() => setStatus(''),3000)
      setTimeout(() => setWithdraw(''),3000)
    return false
    };
    if (withdraw > ctx.balance) {
      setStatus('Error: not enough in account')
      setTimeout(() => setStatus(''),3000)
      setTimeout(() => setWithdraw(''),3000)
    return false
    };
    if (withdraw < parseFloat(withdraw).toFixed(2)) {
      setStatus('Format Error (example: 22.22)')
      setTimeout(() => setStatus(''),3000)
      setTimeout(() => setWithdraw(''),3000)
    return false
    };
    return true
  };

  function handleWithdraw() {
    if (!validate(withdraw)) return
    fetch(`http://localhost:8080/account/withdraw/${ctx.email}/${withdraw}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            if (data.value.balance) {
                ctx.updateBalance(data.value.balance)
            } else {
          
            }
            console.log('JSON:', data);
        } catch(err) {
            
            console.log('err:', text);
        }
    });
    setWithdraw('')
  };     

  return (
    <Card style={{ width: '30rem' }} bg='danger' border='danger' text="dark">
      <Card.Header as="h5">Request A Withdraw</Card.Header>
      <Card.Body>
          <input type="text" className="form-control" id="withdraw" placeholder="Enter amount (example deposit: 22.22)" value={withdraw} onChange={e => setWithdraw(e.currentTarget.value)} />
          <br></br>
          <Button type="submit" className="btn btn-light" disabled={withdraw.length > 0 ? false : true} onClick={handleWithdraw}>Request withdraw</Button>
          {status}
        </Card.Body> 
    </Card>
  );
};