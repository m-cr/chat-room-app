import axios from 'axios'

export const LOAD_FIRST_NEW_MESSAGE = 'LOAD_FIRST_NEW_MESSAGE'

export const loadFirstNewMessage = firstNew => ({
  type: LOAD_FIRST_NEW_MESSAGE,
  firstNew
})

export const fetchNewMessages = () => dispatch => ( 
  axios.get('/api/chat/messages/new')
    .then(res => res.data)
    .then(newMessages => {
      if (newMessages.length)
        dispatch(loadFirstNewMessage(newMessages[0])) 
      else
        dispatch(loadFirstNewMessage({ id: 'x' }))
    })
)