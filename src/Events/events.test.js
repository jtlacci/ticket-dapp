import reducer from './events'
import * as actions from './events'

const ADD = 'event/ADD'
const ADD_INFO = 'event/ADD_INFO'
const ADD_LOG = 'event/ADD_LOG'

const initialState = {
  currentEvent:'',
  eventInfo:{},
  eventUserTickets:'',
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
    expect(
      reducer(undefined,{type:ADD_LOG,eventLog:{account:'0x0', blockTx:'test'}})
    ).toEqual(
      { ...initialState,
        eventUserLogs:[{account:'0x0', blockTx:'test'}]}
    )
  })
})
