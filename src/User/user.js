import web3 from '../Utils/web3'
import firebaseRef from '../Utils/firebase'

const CHANGE_INFO = 'user/CHANGE_INFO'
const CHANGE = 'user/CHANGE'
const GET = 'user/GET'


const initState = {
  currentUser: {}
}

export default function reducer(state = initState, action){
  switch(action.type){
    case CHANGE:
      return {...state, currentUser:action.user}
    case CHANGE_INFO:
      return {...state, currentInfo:action.userInfo}
    default: return state;
  }
}

// create user

// change user
export function changeUser(user){
  return{ type: CHANGE , user}
}

export function changeUserInfo(user, userInfo){
  return{ type: CHANGE_INFO , user, userInfo}
}

// get user's events

// side effects
// get user from web3
export function getUser(){
  return async (dispatch) => {
    var user = await web3.eth.accounts[0]
    dispatch(changeUser(user))
    if(user !== {}){
      dispatch(lookupUser(user))
    }
  }
}
// lookup user from database
export function lookupUser(_web3user){
  return async (dispatch) => {
    var snapshot = await firebaseRef.child('user/'+_web3user).once('value')
    var value = snapshot.val()||{}
    if(value.length > 0){
      dispatch(changeUserInfo(_web3user,value))}
    }
}
