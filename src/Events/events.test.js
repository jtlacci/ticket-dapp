import reducer from './events'
import * as actions from './events'

const ADD = 'event/ADD'
const ADD_INFO = 'event/ADD_INFO'

describe('events', () => {
  it('should add event', () => {
    expect(
      reducer(undefined,{type:ADD,eventAddress:'0x0'})
    ).toEqual(
      {eventsArr:['0x0'],eventsIndex:{'0x0':0}}
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
      eventsIndex:{},
      eventsArr:[]}
    )
  })
})
