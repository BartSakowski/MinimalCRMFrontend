import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';

import Home from './Home';
import AddContact from './AddContact';
import EditContact from './EditContact';
import UserSettings from './UserSettings';
import ContactPage from './ContactPage';
import Navbar from './Navbar';
import Login from './Login';
import SignUp from './components/SignUp';

import { getCurrentUser, logoutUser } from './actions/user';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  
  componentDidMount() {
    const { getCurrentUser } = this.props;
    const token = localStorage.getItem('token');
    if (token) {
      getCurrentUser(token);
    }
  }

  checkLoginStatus() {
  }
  
  render(){
    return (
      <div className="App">
        <Navbar title="REALTOR CRM" description="Get Ready To NOTATE"/>
        <Switch>
          <Route path={'/login'} component={Login} />
          <Route path={'/home'} component={Home} />
          <Route path={'/signup'} component={SignUp} />
          <Route path={'/addcontact'} component={AddContact}/>
          <Route path={'/contact/:contactId'} component={ContactPage}/>
          <Route path={'/editcontact'} component={EditContact}/>
          <Route path={'/usersettings'} component={UserSettings}/>
          {/* <Route path={'/testtable'} component={TestTable}/> */}
        </Switch>
        {/* <Button onClick={this.props.logout} variant='outlined'as={Link} to={'/login'}>logout</Button> */}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentUser: (token) => dispatch(getCurrentUser(token)),
    logout: () => dispatch(logoutUser()),
  };
};

export default connect(null, mapDispatchToProps)(App);
