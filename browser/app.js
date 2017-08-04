import React, { Component } from 'react'
import { connect } from 'react-redux'
import Sidebar from './Sidebar'
import Login from './Login'
import { getUser } from './Login/LoginReducer'

//header stays, if user logged in render children, if not render login component
export class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <header>
          <h1>The Group Chat</h1>
        </header>
        <div className="appBody">
          <Sidebar className='sidebar'/>
          {!this.props.user && <Login />}
          {this.props.user && this.props.children }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ user: getUser(state) })

export default connect(mapStateToProps)(App)
