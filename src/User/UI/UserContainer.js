import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

var _ = require('lodash');

import * as userActions from '../user';


class UserContainer extends React.Component {
  componentDidMount(){
    this.props.checkWeb3()
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

  render() {
    return (
      <div>{this.getMessage()}</div>
    )
  }
}

function mapStateToProps({user}, props) {
  return {
    currentUser:user.currentUser,
    currentInfo:user.currentInfo,
    hasWeb3:user.hasWeb3,
    hasAccount:user.hasAccount,
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...userActions
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
