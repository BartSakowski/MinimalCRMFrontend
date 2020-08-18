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
    // const alert = useAlert();
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














// export class Login extends Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       email: 'bart.sakowski@gmail.com',
//       password: 'password'
//     }
//   }
   
//   handleInputChange = (e) => {
//     this.setState({
//       [e.target.name]: e.target.value
//     })
//   }
  
//   handleSubmit = (e) => {
//     e.preventDefault()

//     const reqObj = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//        },
//       body: JSON.stringify(this.state)
//     }

//     fetch('http://localhost:3000/api/v1/auth', reqObj)
//     .then(resp => resp.json())
//     .then(user => {
//       // store the jwt tokenin the browser memory (localStorage)
//       console.log(user)
//       if (user.error) {
//         alert(user.error)
//       } else {
//         localStorage.setItem('token', user.jwt)
//         this.props.loginSuccess(user)
//         this.props.history.push('/home')
//       }
//     })
//   }

//   render() {
//     console.log(this.props)
//     return (
//       <div>
//         <h3>Sign In</h3>
//         <form onSubmit={this.handleSubmit}> 
//           <input name={'email'} onChange={this.handleInputChange} value={this.state.email} />
//           <input name={'password'} onChange={this.handleInputChange} value={this.state.password} />
//           <input type='submit' value='login' />
//         </form>
//       </div>
//     ) 
//   }
// }

// const mapDispatchToProps ={
//   loginSuccess
// }

// export default connect(null, mapDispatchToProps)(Login); 