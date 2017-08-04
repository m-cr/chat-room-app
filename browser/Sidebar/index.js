import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../Login/LoginActions'
import { getUser } from '../Login/LoginReducer'

//if user logged in render username and logout button
const Sidebar = ({ user, logout }) => (
  <div className='sidebar'>
    { user && 
      <div>
        <h3>{ user.userName }</h3>
        <div className='logout'>
          <button type='submit' onClick={ logout }>Logout</button>
        </div>
      </div>
    }
  </div>
)

const mapStateToProps = (state) => ({ user: getUser(state) })

const mapDispatchToProps = { logout }

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
