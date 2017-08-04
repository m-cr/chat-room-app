import { combineReducers } from 'redux'
import LoginReducer from './Login/LoginReducer'
import ChatReducer from './Chat/ChatReducer'
import NewMessageReducer from './Chat/NewMessageReducer'

//combining login chat and new messages reducers
const rootReducer = combineReducers({
  user: LoginReducer,
  messages: ChatReducer,
  firstNew: NewMessageReducer
})

export default rootReducer