import React from 'react'
import { connect } from 'react-redux'
import { login } from './LoginActions.js'

//login component
export const Login = ({ login }) => {

  const handleSubmit = (e) => {
    e.preventDefault()
    login(e.target.userName.value, e.target.password.value)
  }

  return (
    <div className="login">
      <h4 style={{marginTop: '0px'}}>Login/Signup:</h4>
      <form onSubmit={ handleSubmit }>
        <input style={{ marginRight: '10px' }} name="userName" placeholder="userName"/>
        <input style={{ marginRight: '10px' }} name="password" placeholder="password"/>
        <input type="submit" value="Login"/>
      </form>      
    </div>
  )
}

const mapDispatchToProps = { login }

export default connect(null, mapDispatchToProps)(Login)