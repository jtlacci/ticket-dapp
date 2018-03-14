import reducer from './user'
import * as actions from './user'

const CREATE_ACCOUNT= 'user/CREATE_ACCOUNT'
const UPDATE_INFO = 'user/UPDATE_INFO'
const UPDATE = 'user/UPDATE'
const TOGGLE_HAS_ACCOUNT = 'user/TOGGLE_HAS_ACCOUNT'
const TOGGLE_HAS_WEB3 = 'user/TOGGLE_HAS_WEB3'
const TOGGLE_MODAL = 'user/TOGGLE_MODAL'
const UPDATE_MODAL = 'user/UPDATE_MODAL'

describe('user', () => {
  const initialModal = {
    first: '',
    last: '',
    email: '',
  }
  const initialState = {
    currentUser: {},
    currentInfo: {},
    hasAccount: false,
    hasWeb3: false,
    modalIsOpen: false,
    modalElements: initialModal,
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
        type: TOGGLE_HAS_ACCOUNT,bool:true
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
        type: TOGGLE_HAS_WEB3,bool:true
      })
    ).toEqual(
      {...initialState,
        hasWeb3:true
      }
    )
  })
  it('should toggle modal', () =>{
    expect(
      reducer(undefined, {
        type: TOGGLE_MODAL
      })
    ).toEqual(
      {...initialState,
        modalIsOpen:true
      }
    )
  })
  it('should update modal', () =>{
    let modalInfo = {
      elem1: 'test1'
    }
    expect(
      reducer(undefined, {
        type: UPDATE_MODAL,payload:modalInfo
      })
    ).toEqual(
      {...initialState,
        modalElements: {
          first: '',
          last: '',
          email: '',
          elem1: 'test1'
        }
      }
    )
  })

})
