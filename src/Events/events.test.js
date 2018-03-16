import reducer from './events'
import * as actions from './events'
var BigNumber = require('bignumber.js');

const ADD = 'event/ADD'
const ADD_INFO = 'event/ADD_INFO'
const ADD_LOG = 'event/ADD_LOG'

const initialState = {
  currentEvent:'',
  eventInfo:{},
  eventUserTickets:0,
  eventUserLogs:[]
}

describe('events', () => {
  it('should add event', () => {
    expect(
      reducer(undefined,{type:ADD,eventAddress:'0x0'})
    ).toEqual(
      {...initialState, currentEvent:'0x0' }
    )
  })
  it('should add event info', () => {
    expect(
      reducer(undefined,
        { type:ADD_INFO,
          eventAddress:'0x0',
          info:{1:'test',2:'test'}})
    ).toEqual(
      {...initialState, eventInfo:{1:'test',2:'test'}}
    )
  })
  it('should add event log', () => {
    let rawEventLog = {
      type:'TicketReceipt',
      account:'0x0',
      blockTx:'test',
      tickets:new BigNumber(1)}
    let eventLog = actions.parseBigNumberToInt(rawEventLog)
    //should parse eventLog for big numbers
    expect(eventLog.tickets).toEqual(1)
    expect(
      reducer(undefined,{
        type:ADD_LOG,
        eventLog
      })
    ).toEqual(
      { ...initialState,
        eventUserLogs:[{type:'TicketReceipt',account:'0x0', blockTx:'test',tickets:1}],
        eventUserTickets:1}
    )
  })
})
