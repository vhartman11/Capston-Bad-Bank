import React  from 'react';
import Card   from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export function CreateAccount() {
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  function valiName(name) {
    if (name.length < 1) {
      setStatus('Error: must enter name')
      setTimeout(() => setStatus(''),3000)
      setTimeout(() => setName(''),3000)
      return false
    };
      return true
  };

  function valiEmail(email) {
    if (email.length < 7) {
      setStatus('Error: must enter email')
      setTimeout(() => setStatus(''),3000)
      setTimeout(() => setEmail(''),3000)
      return false
    };
      return true
  };

  function valiPass(password) {
    if (password.length < 8) {
      setStatus('Error: password to short')
      setTimeout(() => setStatus(''),3000)
      setTimeout(() => setPassword(''),3000)
      return false
    };
      return true
  };

  function handleCreate() {
    const url = `http://localhost:8080/account/create/${name}/${email}/${password}`;
    if (!valiName (name,     'name'))     return;
    if (!valiEmail(email,    'email'))    return;
    if (!valiPass (password, 'password')) return;
    (async() => {
      let res = await fetch(url);
      let data = await res.json();
      console.log(data);
    })();
    setShow(false);
  };    

  function clearForm() {
    setName('')
    setEmail('')
    setPassword('')
    setShow(true)
  };

  return (
    <Card style={{ width: '30rem' }} bg='info' border='primary' text="dark">
      {show ? <Card.Body>
        <Card.Header as="h5">Create Account</Card.Header>
        <Card.Text>If you have an account, please click <a href="#/login/">here</a> to login.</Card.Text>
        <Card.Text>Name</Card.Text>
          <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} />
          <br></br>
        <Card.Text>Email Address</Card.Text>
          <input type="email" className="form-control" id="email" placeholder="Enter email (ex. default@example.com)" value={email} onChange={e => setEmail(e.currentTarget.value)}/>
          <br></br>
        <Card.Text>Password</Card.Text>     
          <input type="password" className="form-control" id="password" placeholder="Enter password (at least 8 characters)" value={password} onChange={e => setPassword(e.currentTarget.value)}/>
          <br></br>
          <Button type="submit" className="btn btn-light" disabled={!name ? true : !email ? true : password ? false : true} onClick={handleCreate} >Create Account</Button>
          {status}
      </Card.Body>
      :
      <Card.Body>
        <Card.Text>Account successfully created!</Card.Text>
          <Button className="btn btn-light" href="#/login/">Login to view account</Button>
          <br></br>
          <br></br>
          <Button type="submit" className="btn btn-light" onClick={clearForm}>Add another account?</Button>  
      </Card.Body>
      }
    </Card>
  );
}; 