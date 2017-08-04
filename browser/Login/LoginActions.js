import axios from 'axios'
import { browserHistory } from 'react-router'

export const AUTHENTICATED = 'AUTHENTICATED'

export const authenticate = user => ({
  type: AUTHENTICATED,
  user
})

//login
export const login = (userName, password) => (dispatch) => (
  axios.post('/api/auth/login', { userName, password })
    .then(res => res.data)
    .then(user => dispatch(authenticate(user)))
    .then(() => browserHistory.push('/chat'))
)

//logout
export const logout = () => (dispatch) => (
  axios.post('/api/auth/logout')
    .then(() => dispatch(authenticate(null)))
    .then(() => browserHistory.push('/'))
)

//fetch user if there is one logged into session
export const fetchLoggedInUser = () => (dispatch) => (
  axios.get('/api/auth/user')
    .then(res => res.data)
    .then(user => {
      if(user.id){
        dispatch(authenticate(user))
      } 
    })
)