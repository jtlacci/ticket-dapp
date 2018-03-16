
import Web3 from 'web3'
import eventJSON from '../../build/contracts/Events.json'
var contract = require('truffle-contract')

import web3 from '../Utils/web3'
import eventContract from '../Utils/web3Contracts'
import firebaseRef from '../Utils/firebase'

var BigNumber = require('bignumber.js');
var _ = require('lodash');

const ADD = 'event/ADD'
const ADD_INFO = 'event/ADD_INFO'
const ADD_LOG = 'event/ADD_LOG'
const ADD_ERROR = 'event/ADD_ERROR'

const initialState = {
  currentEvent:'',
  eventInfo:{},
  eventUserTickets:0,
  eventUserLogs:[]
}

function calculateTickets(_numTickets, _eventLog){
  if(_eventLog.type == 'TicketReceipt'){
    return _numTickets + _eventLog.tickets
  }
}

export default function reducer(state = initialState, action){
  switch(action.type){
    case ADD:
      return{...state, currentEvent:action.eventAddress}
    case ADD_INFO:
      return{...state, eventInfo:action.info}
    case ADD_LOG:
      let eventUserTickets = calculateTickets(state.eventUserTickets,action.eventLog)
      return{...state,
        eventUserLogs:[...state.eventUserLogs, action.eventLog],
        eventUserTickets
        }
    case ADD_ERROR:
      return{...state, error:action.error}
    default:
      return state
  }
}

// add event to list
export function addEvent(eventAddress){
  return{ type:ADD, eventAddress}
}

//look up event info
export function addEventInfo(eventAddress,info){
  return{ type:ADD_INFO, eventAddress, info}
}

//add event log
export function addEventLog(eventLog){
  return{ type:ADD_LOG, eventLog}
}

//add event error
export function addEventError(error){
  return{ type:ADD_ERROR, error}
}


// side effects

export function deployTestContract(){
  console.log('deploying');
  return async (dispatch) => {
    try{
    let eventContract = contract(eventJSON)
    eventContract.setProvider(web3.currentProvider)
    let instance = await eventContract.new(['test',10,1,10],{from:web3.eth.accounts[0],gasLimit:2000000})
    console.log(instance);
    }catch(e){
      console.log(e);
    }
  }
}

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
    try{
      let instance = await eventContract.at(_eventAddress)
      let [name,seats,seatsAvailable,price] =
        await Promise.all([
          instance.name.call(),
          instance.seats.call(),
          instance.seatsAvailable.call(),
          instance.price.call()
        ])
      let info = {name, seats, seatsAvailable, price}
      dispatch(addEventInfo(_eventAddress,parseBigNumberToInt(info)))
    }catch(e){
      console.log(e);
      dispatch(addEventError(e))
    }
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
          dispatch(addEventLog(parseBigNumberToInt(snapshot)))
        }
      }
    })
  }
}

export function parseBigNumberToInt(_snapshot){
  return _.mapValues(_snapshot, (value) => {
      try{
        return value.toNumber()
      }catch(e){
        return value
        //TODO: add better Big Number Detection
      }
  })
}
