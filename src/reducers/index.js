import { combineReducers } from 'redux'
import user from './userReducer'
import loggedIn from './loggedInReducer'


export default combineReducers({
  user,
  loggedIn
})
