import { AUTHENTICATED } from './LoginActions.js'

const reducer = (state = null, action) => {
  switch(action.type){
    case AUTHENTICATED:
      return action.user
    default:
      return state
  }
}

export default reducer

export const getUser = state => state.user

export const getUserId = state => state.user.id

export const getUserName = state => state.user.userName