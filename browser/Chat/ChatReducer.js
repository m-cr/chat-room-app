import { LOAD_MESSAGES,  ADD_NEW_MESSAGE } from './ChatActions'

const reducer = (state= [], action) => {
  switch (action.type){
    case LOAD_MESSAGES:
      return [...action.messages]
    case ADD_NEW_MESSAGE:
      return [...state, action.message]
    default: 
      return state
  } 
}

export default reducer

export const getMessages = state => {
  return state.messages 
}