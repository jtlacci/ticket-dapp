import web3 from '../Utils/web3'
import firebaseRef from '../Utils/firebase'

var _ = require('lodash');


export default function reducer(state = {}, action){
  switch(action.type){
    default:
      return state
  }
}

// add event to list


//look up event info

//look up user in event log



// side effects

// add event to database
export function addEventToDB(_eventAddress){
  return async (dispatch) => {
    await firebaseRef.child('event/').push(_eventAddress)

    //TODO: Add event action

  }
}

// get events from database
export function lookupEvents(){
  return async (dispatch) => {
    var snapshot = await firebaseRef.child('event').once('value')
    var value = snapshot.val()||{}
    if(!_.isEmpty(value)){

      //TODO: add event action

    }
  }
}

// get event list from database

//get log of event
