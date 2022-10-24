import React  from 'react';
import Card   from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {UserContext} from './context';

export function Login() {
  const [email, setEmail]           = React.useState('');
  const [password, setPassword]     = React.useState('');
  const [showErrMsg, setShowErrMsg] = React.useState(false);
  const ctx = React.useContext(UserContext); 

  function handleLogin() {
    fetch(`http://localhost:8080/account/login/${email}/${password}`)
    .then(response => response.text())
    .then(text => {
      try {
        const data = JSON.parse(text);
        if (data.length === 1) {
          ctx.updateEmail(data[0].email)
          ctx.updateName(data[0].name)
          ctx.updateBalance(data[0].balance)
        } else {
          setShowErrMsg(true)
        }
          console.log('JSON:', data);
        } catch(err) {
          setShowErrMsg(true)
          console.log('err:', text);
        }
    });
    setPassword('')
    setEmail('')
  };

  return (
    <Card style={{ width: '30rem' }} bg='secondary' border='secondary' text="dark">
      <Card.Body>
      {ctx.email ? <Card.Text>Hello {ctx.name}, you are now logged in.</Card.Text>
      :
        <div>
          <Card.Header as="h5">Login</Card.Header>
          <Card.Text>Click <a href="#/createaccount/">here</a> to create an account.</Card.Text>
          <Card.Text>Email Address</Card.Text>
            <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/>
            <br></br>
          <Card.Text>Password</Card.Text>     
            <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/>
            <br></br>
            {showErrMsg ? 'please try again' : ''}
            <Button type="submit" className="btn btn-light"  onClick={handleLogin} >Login</Button>
        </div>}
      </Card.Body>
    </Card>
    );
};