import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

var _ = require('lodash');

import UserModal from './UserModal'

import * as userActions from '../user';

const UserButton = (text, func) => {
  return(
    <div >
      {text}
    </div>
  )
}

class UserContainer extends React.Component {
  componentDidMount(){
    this.props.checkWeb3()
  }

  getAccount(){
    let acct = this.props.currentUser
    if(!_.isEmpty(acct)){
      return('Account: '+this.props.currentUser)
    }
  }
  getMessage(){
    // if web3 not detected
    if(!this.props.hasWeb3){
      return('No Web3 Detected')
    // if web3 detected but no accounts
    }else if(_.isEmpty(this.props.currentUser)){
      return('Please Login To Web3 Provider')
    // if web3 account detected buy no DappDev Account
    }else if(this.props.hasAccount == false){
      return('Please Sign Up For DappDevs')
    }else{
      return('Welcome')
    }
  }

  getLoad(){
    //if web3 account detected
    if(!_.isEmpty(this.props.currentUser)){
      //if no dappdev account detected
      if(this.props.hasAccount == false){
        if(!this.props.modalIsOpen){
          return UserButton('Sign-Up')
        }else{
          return UserModal(this.props.updateModal,this.props.modalElements)
        }
      }
    }
  }

  render() {
    return (
      <div>
        <p>{this.getAccount()}</p>
        <p>{this.getMessage()}</p>
        {this.getLoad()}
      </div>
    )
  }
}

function mapStateToProps({user}, props) {
  return {
    currentUser:user.currentUser,
    currentInfo:user.currentInfo,
    hasWeb3:user.hasWeb3,
    hasAccount:user.hasAccount,
    modalIsOpen:user.modalIsOpen,
    modalElements:user.modalElements,
    updateModal:user.updateModal
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...userActions
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
