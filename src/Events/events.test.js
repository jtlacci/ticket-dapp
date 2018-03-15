import reducer from './events'
import * as actions from './events'

const ADD = 'event/ADD'

describe('events', () => {
  it('should add event', () => {
    expect(
      reducer(undefined,{type:ADD,eventAddress:'0x0'})
    ).toEqual(
      {eventsArr:['0x0'],eventsIndex:{'0x0':0}}
    )
  })
})
