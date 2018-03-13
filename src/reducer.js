import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import user from './User/user'


const reducer = combineReducers({
  routing: routerReducer,
  user,
})

export default reducer
