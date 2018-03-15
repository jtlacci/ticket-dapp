import web3 from '../Utils/web3'
import eventContract from '../Utils/web3Contracts'
import firebaseRef from '../Utils/firebase'

var _ = require('lodash');

const ADD = 'event/ADD'
const ADD_INFO = 'event/ADD_INFO'

const initialState = {
  eventsIndex:{},
  eventsArr:[]
}

export default function reducer(state = initialState, action){
  switch(action.type){
    case ADD:
      let eventIndex = state.eventsArr.length
      return {...state,
        eventsIndex:{
          ...state.eventsIndex,
          [action.eventAddress]:eventIndex
        },
        eventsArr:[...state.eventsArr,action.eventAddress]}
    case ADD_INFO:
      return{...state, [action.eventAddress]:action.info}
    default:
      return state
  }
}

// add event to list
function addEvent(eventAddress){
  { type:ADD, eventAddress}
}

//look up event info
function addEventInfo(eventAddress,info){
  { type:ADD_INFO, eventAddress, info}
}

//look up user in event log



// side effects

// add event to database
export function addEventToDB(_eventAddress){
  return async (dispatch) => {
    await firebaseRef.child('event/').push(_eventAddress)
    dispatch(addEvent(_eventAddress))
  }
}

// get events from database
export function lookupEvents(){
  return async (dispatch) => {
    var snapshot = await firebaseRef.child('event').once('value')
    var value = snapshot.val()||{}
    if(!_.isEmpty(value)){
      dispatch(addEvent(value))
    }
  }
}

// get event info
export function getEventInfo(_eventAddress){
  return async(dispatch) => {
    let instance = await eventContract.at(_eventAddress)
    let [name,seats,seatsAvailable,price] =
      await Promise.all([
        instance.name.call(),
        instance.seats.call(),
        instance.seatsAvailable.call(),
        instance.price.call()
      ])
    let info = {name, seats, seatsAvailable, price}
    dispatch(addEventInfo(_eventAddress,info))
  }
}

//get log of event
