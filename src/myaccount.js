import React from 'react';
import 'bootstrap';
import {Balance}     from './balance'
import {Deposit}     from './deposit';
import {UserContext} from './context';
import {Withdraw}    from './withdraw';

export function MyAccount() {
    const ctx = React.useContext(UserContext)

    return (
        ctx.name ?    
        <div>
            <Balance></Balance>
            <br></br>
            <Withdraw></Withdraw>
            <br></br>
            <Deposit></Deposit>
        </div> : <div>'Must <a href="#/createaccount/">create an account</a>, or be <a href="#/login/">logged in</a>.'</div>
    );
};