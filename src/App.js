import React, { Component } from 'react'
import { Link } from 'react-router'


// Styles


class App extends Component {
  render() {
    // gets web3 passed from route in  index.js
    var web3 = this.props.route.web3
    // grab the default account
    var account = web3.eth.accounts[0]
    
    return (
      <div className="App">

        <h2>APP</h2>
        <h1>{'hello: ' + account}</h1>
      </div>
    );
  }
}

export default App
