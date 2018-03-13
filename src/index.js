import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import Web3 from 'web3'


// Layouts
import App from './App'


// Redux Store
import store from './store'

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store)

// Initialize Web3

window.addEventListener('load', function() {
  var web3js;
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof window.web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    web3js = new Web3(window.web3.currentProvider);
    console.log('MetaMask Detected');
  } else {
    console.log('No web3? You should consider trying MetaMask!')
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    web3js = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  // Now you can start your app & access web3 freely:
  startApp(web3js)

})

function startApp(_web3js){

  ReactDOM.render((
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={App} web3={_web3js}>
          </Route>
        </Router>
      </Provider>
    ),
    document.getElementById('root')
  )
}
