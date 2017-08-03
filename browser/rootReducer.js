import { combineReducers } from 'redux'
import LoginReducer from './Login/LoginReducer'
import ChatReducer from './Chat/ChatReducer'

const rootReducer = combineReducers({
  user: LoginReducer,
  messages: ChatReducer
})

export default rootReducer