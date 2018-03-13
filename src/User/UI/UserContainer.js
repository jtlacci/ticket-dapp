import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../user';

class UserContainer extends React.Component {
  componentWillMount(){
    this.props.getUser()
  }

  render() {
    let web3 = this.props
    return (
      <h1>{'hello: ' + this.props.currentUser}</h1>
    )
  }
}

function mapStateToProps({user}, props) {
  return {
    currentUser:user.currentUser,
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...userActions
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
