import reducer from './events'
import * as actions from './events'

const ADD = 'event/ADD'
const ADD_INFO = 'event/ADD_INFO'
const ADD_LOG = 'event/ADD_LOG'

describe('events', () => {
  it('should add event', () => {
    expect(
      reducer(undefined,{type:ADD,eventAddress:'0x0'})
    ).toEqual(
      { eventLogs:[],eventsArr:['0x0'],eventsIndex:{'0x0':0}}
    )
  })
  it('should add event info', () => {
    expect(
      reducer(undefined,
        { type:ADD_INFO,
          eventAddress:'0x0',
          info:{1:'test',2:'test'}})
    ).toEqual(
      {'0x0':{1:'test',2:'test'},
      eventLogs:[],
      eventsIndex:{},
      eventsArr:[]}
    )
  })
  it('should add event log', () => {
    expect(
      reducer(undefined,{type:ADD_LOG,eventLog:{account:'0x0', blockTx:'test'}})
    ).toEqual(
      { eventsIndex:{},
        eventsArr:[],
        eventLogs:[{account:'0x0', blockTx:'test'}]}
    )
  })
})
