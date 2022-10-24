import React  from 'react'; 
import Card   from 'react-bootstrap/Card';
import {UserContext} from './context';

export function Balance() {
    const ctx = React.useContext(UserContext)

    return (
      ctx.name ?
      <Card style={{ width: '30rem' }} bg='primary' border='primary' text="dark">
        <Card.Header as="h5">Current Account Balance:</Card.Header>
          <Card.Body>
            <Card.Text>
              ${ctx.balance}
            </Card.Text>
          </Card.Body> 
      </Card>
      :
      <div>'Must <a href="#/createaccount/">create an account</a>, or be <a href="#/login/">logged in</a>.'</div>
    );
};