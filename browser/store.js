import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './rootReducer'
import io from 'socket.io-client'
import { createLogger  } from 'redux-logger'
import { addNewMessage } from './Chat/ChatActions'

//create store with logging and thunk middleware for async
const store = createStore(reducer, applyMiddleware(createLogger({ collapsed: true }), thunk))

export default store

export const socket = io('http://localhost:3000/')

socket.on('connect', () => {
  socket.on('addMessage', (message) => {
    store.dispatch(addNewMessage(message))
  })
})