import web3 from '../Utils/web3'
import firebaseRef from '../Utils/firebase'

var _ = require('lodash');

const CREATE_ACCOUNT= 'user/CREATE_ACCOUNT'
const UPDATE_INFO = 'user/UPDATE_INFO'
const UPDATE = 'user/UPDATE'
const TOGGLE_HAS_ACCOUNT = 'user/TOGGLE_HAS_ACCOUNT'
const TOGGLE_HAS_WEB3 = 'user/TOGGLE_HAS_WEB3'



const initialState = {
  currentUser: {},
  currentInfo: {},
  hasAccount: false,
  hasWeb3: false,
}

export default function reducer(state = initialState, action){
  switch(action.type){
    case UPDATE:
      return {...state, currentUser:action.user}
    case UPDATE_INFO:
      return {...state, currentInfo:action.userInfo}
    case TOGGLE_HAS_ACCOUNT:
      let prevStateAcct = state.hasAccount
      return {...state, hasAccount:!prevStateAcct}
    case TOGGLE_HAS_WEB3:
      let prevStateWeb3 = state.hasWeb3
      return {...state, hasWeb3:!prevStateWeb3}
    default: return state;
  }
}


// update user
export function updateUser(user = {}){
  return{ type: UPDATE , user}
}

export function updateUserInfo(user, userInfo){
  return{ type: UPDATE_INFO , user, userInfo}
}

export function toggleHasAccount(){
  return{ type: TOGGLE_HAS_ACCOUNT}
}

export function toggleHasWeb3(){
  return{ type: TOGGLE_HAS_WEB3}
}

// get user's events

// side effects
export function checkWeb3(){
  return async (dispatch) =>{
    var Web3 = await web3
    //if web3 is detected
    if (Web3 && !_.isEmpty(Web3)){
      dispatch(toggleHasWeb3())
      dispatch(setUserListener())
    }
  }
}

// get user from web3
export function getUser(){
  return async (dispatch) => {
    var user = await web3.eth.accounts[0]
    dispatch(updateUser(user))
    // if user is valid
    if(user && !_.isEmpty(user)){
      dispatch(lookupUser(user))
    }
  }
}

export function setUserListener(){
  return async (dispatch) => {
    //get current user
    var user = web3.eth.accounts[0]
    //set interval to check if user has changed
    var userInterval = setInterval(function(){
      //if user has changed
      if(web3.eth.accounts[0] !== user){
        user = web3.eth.accounts[0]
        dispatch(getUser())
      }
    })
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
    if(!_.isEmpty(value)){
      dispatch(updateUserInfo(_web3user,value))
      dispatch(toggleHasAccount())
    }
  }
}
