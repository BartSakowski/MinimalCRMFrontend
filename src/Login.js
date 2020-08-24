import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from './actions/user';
import { Form, Button, Grid, Header, Segment, Message } from 'semantic-ui-react';

class Login extends Component {
  
  state = {
    email: '',
    password: '',
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.loginUser(this.state);
    this.setState({ email: '', password: '' });
    // return <Home user={this.state}/>
  };

  render() {
    const { email, password } = this.state;
    return (
      <Grid textAlign='center' verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h1' color='grey' textAlign='center'>
            WELCOME TO MINIMAL CRM
          </Header>
          <Header as='h3' color='blue' textAlign ='center'>
            Log In  
          </Header>
          <Form size='large' onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                name='email' 
                value={email} 
                placeholder='Email' 
                onChange={this.handleChange} 
              />
              <Form.Input
                placeholder='Password'
                name='password'
                type='password'
                value={password}
                onChange={this.handleChange}
              />
              <Button type='submit'>Login</Button>
            </Segment>
          </Form>
          <Message>
            Need to Sign Up? <a href='/signup'>Click Here</a>
          </Message>
        </Grid.Column>
      </Grid>  
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return { loginUser: (user) => dispatch(loginUser(user)) };
};

export default connect(null, mapDispatchToProps)(Login);