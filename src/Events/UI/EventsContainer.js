import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

var _ = require('lodash');

import * as eventActions from '../events';

class EventsContainer extends React.Component {



  render() {

      return(
        <div>
        <h3>{'Event'}</h3>
        <p>{this.props.currentEvent}</p>
        </div>
      )
  }
}


function mapStateToProps({events}, props) {
  let currentEvent = props.eventsFilter
  return {
    currentEvent
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...eventActions
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsContainer);
