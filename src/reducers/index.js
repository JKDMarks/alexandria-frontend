import { combineReducers } from 'redux'
import user from './userReducer'
import loggedIn from './loggedInReducer'
import cards from './cardsReducer'
import decks from './decksReducer'
import isLoading from './isLoadingReducer'


export default combineReducers({
  user,
  loggedIn,
  cards,
  decks,
  isLoading
})
