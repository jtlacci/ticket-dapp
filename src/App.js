import React, { Component } from 'react'
import { Link } from 'react-router'
import UserContainer from './User/UI/UserContainer'


// Styles


class App extends Component {
  render() {


    return (
      <div className="App">

        <h2>{'DAPPDEVS (DEV)ENTS'}</h2>
        {this.props.children}
      </div>
    );
  }
}

export default App
