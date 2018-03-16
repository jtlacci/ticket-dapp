import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'




// Layouts
import App from './App'
import UserContainer from './User/UI/UserContainer'
import EventsContainer from './Events/UI/EventsContainer'

// Redux Store
import store from './store'

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store)

// Waiting for Web3 has been injected by the browser (Mist/MetaMask)
window.addEventListener('load', function() {

  // Now you can start your app & access web3 freely:
  startApp()

})

function startApp(){

  ReactDOM.render((
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={App} />
          <Route path="/:eventsFilter" component={App} />
        </Router>
      </Provider>
    ),
    document.getElementById('root')
  )
}
