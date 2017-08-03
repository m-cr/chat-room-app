import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { addNewChatMessage } from './ChatActions'
import { getMessages } from './ChatReducer'
import { getUserName, getUserId } from '../Login/LoginReducer'

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = { message: '' }
  }

  componentDidUpdate() {
    this.chatBottomRef.scrollIntoView()
  }

  handleChange(e) {
    this.setState({ message: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()
    const { addNewChatMessage, userId } = this.props
    let message = e.target.message.value
    if (e.target.message.value.length > 0) {
      addNewChatMessage(message, userId)
      this.setState({ message: '' })
    }
  }

  parseDate(date) {
    return moment.utc(date).format('LT')
  }

  render() {
    const { messages } = this.props
    return (
      <div className="chat">
        <div className="messages">
          {messages.map( (message, idx) => (
            <p key={idx} ref={ (ref) => { if (idx === messages.length - 1) {this.chatBottomRef = ref }}}>
              {message.user.userName}: {message.content}
            </p>
          ))}        
        </div> 
        <div className="messageForm">
          <form onSubmit={this.onSubmit.bind(this)}>
            <input className="messageText" onChange={this.handleChange.bind(this)} name="message" value={ this.state.message } placeholder={'Type Message Here'}/>
          </form>
        </div> 
      </div>
    )
  }
}

const mapStateToProps = state => ({
  messages: getMessages(state),
  userId: getUserId(state),
  userName: getUserName(state)
})

const mapDispatchToProps = { addNewChatMessage }

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
