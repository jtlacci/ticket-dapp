import web3 from '../Utils/web3'
import eventContract from '../Utils/web3Contracts'
import firebaseRef from '../Utils/firebase'

var _ = require('lodash');

const ADD = 'event/ADD'
const ADD_INFO = 'event/ADD_INFO'
const ADD_LOG = 'event/ADD_LOG'

const initialState = {
  currentEvent:'',
  eventInfo:{},
  eventUserTickets:'',
  eventUserLogs:[]
}

export default function reducer(state = initialState, action){
  switch(action.type){
    case ADD:
      return{...state, currentEvent:action.eventAddress}
    case ADD_INFO:
      return{...state, eventInfo:action.info}
    case ADD_LOG:
      return{...state, eventUserLogs:[...state.eventUserLogs, action.eventLog]}
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

//add event log
function addEventLog(eventLog){
  { type:ADD_LOG, eventLog}
}


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

//get logs of event
export function getEventLogsByAccount(_account,_eventAddress){
  return async(dispatch) => {
    let instance = await eventContract.at(_eventAddress)
    //set event filter to user account from origin block
    let eventFilter = instance.allEvents({address:_account},{fromBlock:0,toBlock:'latest'})
    //test for unique obj
    var uniqueTestObj = {}
    // set event listener
    eventFilter.watch(function (error,event){
      if(!error){
        // get tx hash
        let txHash = event.transactionHash
        // get event snapshot
        let snapshot = {
          type:event.event,
          blockNumber:event.blockNumber,
          ...event.args
          }
        //if txHash doesnt exist in uniqueTestObj
        if(!uniqueTestObj[txHash]){
          // add to unique txHash test
          test = {...test, [txHash]:snapshot }
          // add event to reducer
          dispatch(addEventLog(snapshot))
        }
      }
    })
  }
}
