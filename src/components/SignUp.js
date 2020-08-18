import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userPostFetch } from '../actions/signup';
import { Form, Button, Grid, Header, Segment, Message } from 'semantic-ui-react';

class Signup extends Component {
  state = {
    email: "",
    password: "",
    first_name: "",
    last_name: ""
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.userPostFetch(this.state)
  }

  render() {
    return (
      <Grid textAlign='center' verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='blue' textAlign='center'>
            Sign Up for an Account
          </Header>
          <Form size='large' onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input 
                name='email' 
                placeholder='Email' 
                value={this.state.email} 
                onChange={this.handleChange}
              />
              <Form.Input 
                type='password' 
                name='password' 
                placeholder='Password' 
                value={this.state.password} 
                onChange={this.handleChange}
              />
              <Form.Input 
                name='first_name' 
                placeholder='First Name' 
                value={this.state.first_name} 
                onChange={this.handleChange}
              />
              <Form.Input 
                name='last_name' 
                placeholder='Last Name'
                value={this.state.last_name} 
                onChange={this.handleChange}
              />
              <Button color='blue' type='submit'>Submit</Button>
            </Segment>
          </Form>
          <Message>
            Already have an Account? <a href='/login'>Log In</a>
          </Message>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  userPostFetch: userInfo => dispatch(userPostFetch(userInfo))
})

export default connect(null, mapDispatchToProps)(Signup);