import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import store from './reducers/index'

import { getCurrentUser, logoutUser } from './actions/user';

class NavBar extends Component {

  handleLogout = () => {
    localStorage.removeItem('token')
    this.props.logoutUser()
  }


  render() {
    // console.log("nav", store.getState().user.id)
    
    return (
      <Menu>
        <Menu.Item as={Link} to='/home'>
          Home
        </Menu.Item>

        <Menu.Item as={Link} to='/addcontact'>
          Add Contact
        </Menu.Item>

        {/* <Menu.Item as={Link} to='/usersettings'>
          User Settings
        </Menu.Item> */}

        <div className="right menu">
          {
            store.getState().user !== [] ?
            <Menu.Item as={Link} to='/login' position='right' onClick={this.props.logout}>
              Logout
            </Menu.Item>
            :
            <Menu.Item as={Link} to='/login' position='right'>
              Login
            </Menu.Item>
          }
        </div>
      </Menu>
    )
  }
}



const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentUser: (token) => dispatch(getCurrentUser(token)),
    logout: () => dispatch(logoutUser()),
  };
};

export default connect(null, mapDispatchToProps)(NavBar);