import { LOAD_FIRST_NEW_MESSAGE } from './NewMessageActions.js'

const reducer = (state = null, action) => {
  switch (action.type){
    case LOAD_FIRST_NEW_MESSAGE:
      return action.firstNew
    default:
      return state
  } 
}

export default reducer

export const getFirstNewMessage = state => state.firstNew