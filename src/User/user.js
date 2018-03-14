import web3 from '../Utils/web3'
import firebaseRef from '../Utils/firebase'

const CREATE_ACCOUNT= 'user/CREATE_ACCOUNT'
const UPDATE_INFO = 'user/UPDATE_INFO'
const UPDATE = 'user/UPDATE'
const TOGGLE_HAS_ACCOUNT = 'user/TOGGLE_HAS_ACCOUNT'



const initialState = {
  currentUser: {},
  currentInfo: {},
  hasAccount: false,
}

export default function reducer(state = initialState, action){
  switch(action.type){
    case UPDATE:
      return {...state, currentUser:action.user}
    case UPDATE_INFO:
      return {...state, currentInfo:action.userInfo}
    case TOGGLE_HAS_ACCOUNT:
      let prevState = state.hasAccount
      return {...state, hasAccount:!prevState}
    default: return state;
  }
}


// UPDATE user
export function updateUser(user){
  return{ type: UPDATE , user}
}

export function updateUserInfo(user, userInfo){
  return{ type: UPDATE_INFO , user, userInfo}
}

export function toggleHasAccount(){
  return{ type: TOGGLE_HAS_ACCOUNT}
}

// get user's events

// side effects

// get user from web3
export function getUser(){
  return async (dispatch) => {
    var user = await web3.eth.accounts[0]
    dispatch(updateUser(user))
    if(user !== {}){
      dispatch(lookupUser(user))
    }
  }
}
// create account
export function createAccount(_user,_info){
  return async (dispatch) => {
  await firebaseRef.child('user/'+_user).set(_info)
  dispatch(updateUserInfo(_user,_info))
  dispatch(toggleHasAccount())
  }

}
// lookup user from database
export function lookupUser(_web3user){
  return async (dispatch) => {
    var snapshot = await firebaseRef.child('user/'+_web3user).once('value')
    var value = snapshot.val()||{}
    if(value.length > 0){
      dispatch(updateUserInfo(_web3user,value))
      dispatch(toggleHasAccount())
    }
  }
}
