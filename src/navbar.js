import React         from 'react';
import Container     from 'react-bootstrap/Container';
import Nav           from 'react-bootstrap/Nav';
import Navbar        from 'react-bootstrap/Navbar';
import {Link}        from 'react-router-dom';
import {UserContext} from './context';

export function Navigation() {
    const ctx = React.useContext(UserContext); 
    
    function handleLogOut() {
        ctx.updateEmail('')
        ctx.updateName('')
        ctx.updateBalance(0)
    };

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#">Bad Bank</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#/CreateAccount/">Create Account</Nav.Link>
                        {ctx.name ? <Nav.Link href="#/myaccount/">My Account</Nav.Link> : ''}
                        {ctx.name ? '' : <Nav.Link href="#/login/">Login</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
                <Nav>
                <div>
                    {ctx.name ? <span>Hello {ctx.name} <Link to="" onClick={handleLogOut}>Log Out</Link></span> : <span>Please <a href="#/login/">Login</a></span>}
                </div>
                </Nav>
            </Container>
        </Navbar>
    );
};