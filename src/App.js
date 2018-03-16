import React, { Component } from 'react'
import { Link } from 'react-router'
import UserContainer from './User/UI/UserContainer'
import EventsContainer from './Events/UI/EventsContainer'

// Styles


class App extends Component {

  render() {
    console.log(this.props);
    return (
      <div className="App">

        <h2>{'DAPPDEVS EVENTS'}</h2>
        <UserContainer/>
        <EventsContainer eventsFilter = {this.props.params.eventsFilter}/>
      </div>
    );
  }
}

export default App
