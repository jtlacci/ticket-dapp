import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

var _ = require('lodash');

import * as eventActions from '../events';

import EventInfo from './EventInfo'

class EventsContainer extends React.Component {

  componentWillMount(){
    let currentEvent = this.props.currentEvent
    if(currentEvent){
      this.props.addEvent(currentEvent)
      this.props.getEventInfo(currentEvent)
    }
  }

  render() {
    if(this.props.currentEvent && !_.isEmpty(this.props.eventInfo)){
      return(
        <div>
          <h3>{'Event'}</h3>
          <p>{this.props.currentEvent}</p>
          <div>
            <EventInfo
              eventInfo = {this.props.eventInfo}
             />
          </div>
        </div>
      )
    }else{
      return(
        <div>
          <h3>{'Not Valid Event Address'}</h3>
        </div>
      )
    }

  }
}


function mapStateToProps({events}, props) {
  let currentEvent = props.eventsFilter
  return {
    currentEvent,
    eventInfo:events.eventInfo
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...eventActions
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsContainer);
