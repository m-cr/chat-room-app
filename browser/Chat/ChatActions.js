import axios from 'axios'
import { socket } from '../store'

export const LOAD_MESSAGES ='LOAD_MESSAGES'
export const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE'

export const loadMessages = messages => ({
  type: LOAD_MESSAGES,
  messages
})

export const addNewMessage = message => ({
  type: ADD_NEW_MESSAGE,
  message
})

export const fetchMessages = () => dispatch => (
  axios.get('/api/chat/messages')
    .then(res => res.data)
    .then(messages => {
      dispatch(loadMessages(messages))
    })
)

export const addNewChatMessage = (newMessage, userId) => dispatch => (
  axios.post('/api/chat/messages', { message: newMessage, userId })
    .then(res => res.data)
    .then(createdMessage => {
      dispatch(addNewMessage(createdMessage))
      socket.emit('newMessage', createdMessage)
    })
)