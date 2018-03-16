import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import user from './User/user'
import events from './Events/events'


const reducer = combineReducers({
  routing: routerReducer,
  user,
  events
})

export default reducer
