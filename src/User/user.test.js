import reducer from './user'
import * as actions from './user'

const CREATE_ACCOUNT= 'user/CREATE_ACCOUNT'
const UPDATE_INFO = 'user/UPDATE_INFO'
const UPDATE = 'user/UPDATE'
const TOGGLE_HAS_ACCOUNT = 'user/TOGGLE_HAS_ACCOUNT'
const TOGGLE_HAS_WEB3 = 'user/TOGGLE_HAS_WEB3'

describe('user', () => {
  const initialState = {
    currentUser: {},
    currentInfo: {},
    hasAccount: false,
    hasWeb3: false,
  }

  it('should have initial state', () =>{
    expect(
      reducer(undefined,{type:'empty'})
    ).toEqual(
      initialState
    )
  })

  var updateUserState = {
    ...initialState,
    currentUser:'testUser'}

  it('should update a new user', () =>{
    expect(
      reducer(undefined, {
        type: UPDATE,
        user: 'testUser'
      })
    ).toEqual(updateUserState)
  })

  var updateUserInfo ={
    ...updateUserState,
    currentInfo:{
      info:'testInfo'
    }}

  it('should update user info', () =>{
    expect(
      reducer(updateUserState, {
        type: UPDATE_INFO,
        userInfo: {info:'testInfo'}
      })
    ).toEqual(
      updateUserInfo
    )
  })

  it('should toggle has account', () =>{
    expect(
      reducer(undefined, {
        type: TOGGLE_HAS_ACCOUNT,
      })
    ).toEqual(
      {...initialState,
        hasAccount:true
      }
    )
  })
  it('should toggle has web3', () =>{
    expect(
      reducer(undefined, {
        type: TOGGLE_HAS_WEB3,
      })
    ).toEqual(
      {...initialState,
        hasWeb3:true
      }
    )
  })

})
