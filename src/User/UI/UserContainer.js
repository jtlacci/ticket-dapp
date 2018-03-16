import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

var _ = require('lodash');

import UserModal from './UserModal'
import UserButton from './UserButton'

import * as userActions from '../user';

const NO_WEB3 = 'NO_WEB3'
const NO_WEB3_ACCOUNT = 'NO_WEB3_ACCOUNT'
const NOT_MEMBER = 'NOT_MEMBER'
const MEMBER = 'MEMBER'


class UserContainer extends React.Component {
  componentDidMount(){
    this.props.checkWeb3()
  }

  getAccount(){
    let acct = this.props.currentUser
    if(!_.isEmpty(acct)){
      return('Account: '+acct)
    }
  }
  getMessage(){
    var userState = this.props.userState
    if(userState == NO_WEB3){
      return('No Web3 Detected')
    }if(userState == NO_WEB3_ACCOUNT){
      return('Please Login To Web3 Provider')
    }if(userState == NOT_MEMBER){
      return('Please Sign Up For DappDevs')
    }if(userState == MEMBER){
      return('Welcome To DappDevs ')
    }
  }

  handleSubmit = () => {
    this.props.createAccount(this.props.currentUser,
      this.props.modalElements)
  }

  render() {
      return(
        <div>
        <p>{this.getAccount()}</p>
        <p>{this.getMessage()}</p>
        </div>
      )
  }
}


function mapStateToProps({user}, props) {
  var userState;
  if(!user.hasWeb3){
    userState = NO_WEB3
  // if web3 detected but no accounts
  }else if(_.isEmpty(user.currentUser)){
    userState = NO_WEB3_ACCOUNT
  // if web3 account detected buy no DappDev Account
  }else{
    userState = MEMBER
  }

  return {
    userState,
    currentUser:user.currentUser,
    currentInfo:user.currentInfo,
    hasWeb3:user.hasWeb3,
    hasAccount:user.hasAccount,
    modalIsOpen:user.modalIsOpen,
    modalElements:user.modalElements,
    updateModal:user.updateModal,
    toggleModal:user.toggleModal
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...userActions
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
