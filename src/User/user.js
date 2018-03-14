import web3 from '../Utils/web3'
import firebaseRef from '../Utils/firebase'

var _ = require('lodash');

const CREATE_ACCOUNT= 'user/CREATE_ACCOUNT'
const UPDATE_INFO = 'user/UPDATE_INFO'
const UPDATE = 'user/UPDATE'
const TOGGLE_HAS_ACCOUNT = 'user/TOGGLE_HAS_ACCOUNT'
const TOGGLE_HAS_WEB3 = 'user/TOGGLE_HAS_WEB3'
const TOGGLE_MODAL = 'user/TOGGLE_MODAL'
const UPDATE_MODAL = 'user/UPDATE_MODAL'

const initialModal = {
  first: '',
  last: '',
  email: '',
}

const initialState = {
  currentUser: {},
  currentInfo: {},
  hasAccount: false,
  hasWeb3: false,
  modalIsOpen: false,
  modalElements: initialModal,
}


function updateModalElements(state = initialModal ,action){
  let payload = action.payload
  let key = Object.keys(payload)[0]
  let value = Object.values(payload)[0]
  return {...state, [key]:value }
}

export default function reducer(state = initialState, action){
  switch(action.type){
    case UPDATE:
      return {...state, currentUser:action.user}
    case UPDATE_INFO:
      return {...state, currentInfo:action.userInfo}
    case TOGGLE_HAS_ACCOUNT:
      return {...state, hasAccount:action.bool}
    case TOGGLE_HAS_WEB3:
      return {...state, hasWeb3:action.bool}
    case TOGGLE_MODAL:
      let prevState = state.modalIsOpen
      return {...state, modalIsOpen:!prevState}
    case UPDATE_MODAL:
      let modalElements = updateModalElements(state.modalElements,action)
      return {...state, modalElements}
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

export function toggleHasAccount(bool){
  return{ type: TOGGLE_HAS_ACCOUNT, bool}
}

export function toggleHasWeb3(bool){
  return{ type: TOGGLE_HAS_WEB3, bool}
}

export function toggleModal(){
  return{ type: TOGGLE_MODAL}
}

export function updateModal(args){
  return{ type: UPDATE_MODAL, payload:args}
}

// get user's events

// side effects
export function checkWeb3(){
  return async (dispatch) =>{
    var Web3 = await web3
    //if web3 is detected
    if (Web3 && !_.isEmpty(Web3)){
      dispatch(toggleHasWeb3(true))
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
    dispatch(getUser())
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
  dispatch(toggleModal())
  dispatch(toggleHasAccount(true))
  }

}
// lookup user from database
export function lookupUser(_web3user){
  return async (dispatch) => {
    var snapshot = await firebaseRef.child('user/'+_web3user).once('value')
    var value = snapshot.val()||{}
    if(!_.isEmpty(value)){
      dispatch(updateUserInfo(_web3user,value))
      dispatch(toggleHasAccount(true))
    }
  }
}
