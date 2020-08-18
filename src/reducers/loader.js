export default function auth(state=true, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return false
    default:
      return state
  }
}