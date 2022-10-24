import React     from 'react'; 
import Card      from 'react-bootstrap/Card';
import BankImage from './bank.png';

export function Home() {
  return (
    <Card style={{ width: '30rem' }}>
      <Card.Title>Welcome to Bad Bank.</Card.Title>
      <Card.Img variant="top" src={BankImage} />
      <Card.Body>
        <Card.Subtitle>Created by Vince Hartman</Card.Subtitle>
        <Card.Text>Use the navigation bar to move arround.</Card.Text>
      </Card.Body>
    </Card>
  );  
};