import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './rootReducer'
import io from 'socket.io-client'
import { createLogger  } from 'redux-logger'

const store = createStore(reducer, applyMiddleware(createLogger({ collapsed: true }), thunk))

export default store

export const socket = io('http://localhost:3000/')

socket.on('connect', () => { })