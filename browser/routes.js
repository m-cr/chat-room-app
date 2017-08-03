import React from 'react'
import { connect } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import App from './app'
import Chat from './Chat'

import { fetchLoggedInUser } from './Login/LoginActions'
import { fetchMessages } from './Chat/ChatActions'

const Routes = ({ checkLoggedInUser, fetchAllMessages }) => (
  <Router history={ browserHistory }>
    <Route path="/" component={ App } onEnter={ checkLoggedInUser }>
      <Route path='/chat' component={ Chat } onEnter={ fetchAllMessages } />
    </Route>
  </Router>
)

const mapStateToProps = null

const mapDispatchToProps = (dispatch) => ({
  checkLoggedInUser() {
    dispatch(fetchLoggedInUser())
  },
  fetchAllMessages() {
    dispatch(fetchMessages())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Routes)