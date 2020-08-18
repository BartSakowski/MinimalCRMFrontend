import history from "../history";

export const getUser = (user) => ({ type: 'GET_USER', user });

export const userPostFetch = user => {
  // debugger
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({user})
    })
      .then(resp => resp.json())
      .then(data => {
        // debugger
        if (data.message) {

        } else {
          localStorage.setItem("token", data.token)
          dispatch(getUser(data.user))
          history.push('/home')
        }
      })
  }
}

const loginUser = userObj => ({
  type: 'LOGIN_SUCCESS',
  user: userObj
})