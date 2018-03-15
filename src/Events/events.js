import web3 from '../Utils/web3'
import eventContract from '../Utils/web3Contracts'
import firebaseRef from '../Utils/firebase'

var _ = require('lodash');

const ADD = 'event/ADD'

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
    default:
      return state
  }
}

// add event to list
function addEvent(eventAddress){
  { type:ADD, eventAddress}
}


//look up event info

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
    let infoArr = await Promise.all([
      instance.
    ])

  }
}

//get log of event
