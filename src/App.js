import React from 'react';
import 'bootstrap';
import {HashRouter, Route, Routes} from 'react-router-dom';
import {Balance}       from './balance'
import {CreateAccount} from './createaccount';
import {Deposit}       from './deposit';
import {Home}          from './home';
import {Login}         from './login';
import {MyAccount}     from './myaccount';
import {Navigation}    from './navbar';
import {UserContext}   from './context';
import {Withdraw}      from './withdraw';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.updateBalance = (balance) => {
      this.setState(() => ({
        balance: balance
      }));
    };
    this.updateName = (name) => {
      this.setState(() => ({
        name: name
      }));
    };
    this.updateEmail = (email) => {
      this.setState(() => ({
        email: email
      }));
    };
    this.state = {balance:0, name:'', email:'', 
    updateBalance: this.updateBalance,
    updateName: this.updateName,
    updateEmail: this.updateEmail
    };
  };

  render() {
    return (
      <HashRouter>
        <UserContext.Provider value={this.state}>
          <Navigation/>
            <div className="container" style={{padding: "20px"}}>
              <Routes>
                <Route path="/" exact element={<Home/>} />
                <Route path="/balance/"       element={<Balance/>} />
                <Route path="/context/"       element={<UserContext/>} />
                <Route path="/createaccount/" element={<CreateAccount/>} />
                <Route path="/deposit/"       element={<Deposit/>}/>
                <Route path="/login/"         element={<Login/>} />
                <Route path="/myaccount/"     element={<MyAccount/>} />
                <Route path="/withdraw/"      element={<Withdraw/>} />
              </Routes>
            </div>
        </UserContext.Provider>
      </HashRouter>
    );
  };
};

export default App;