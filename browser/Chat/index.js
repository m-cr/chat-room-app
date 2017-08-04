import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { addNewChatMessage } from './ChatActions'
import { getMessages } from './ChatReducer'
import { getFirstNewMessage } from './NewMessageReducer'
import { getUserName, getUserId } from '../Login/LoginReducer'

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = { message: '' }
  }

  //after component mounts and updates scroll to bottom of chat window
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

  //for date on messages
  parseDate(date) {
    return moment.utc(date).local().format('LT')
  }

  //message list with conditionals for outgoing or incoming messages and 'new messages' formatting
  render() {
    const { messages, firstNewMessage } = this.props
    return (
      <div className="chat">
        <div className="messageList">
          {messages.map( (message, idx) => (
            <div key={idx} ref={ (ref) => { if (idx === messages.length - 1) { this.chatBottomRef = ref }}}>
              { 
                firstNewMessage && message.id == firstNewMessage.id &&
                  <div>
                    <p className='newMessages'>New Messages</p>
                    <hr />
                  </div> 
              }
              { 
                (message.userId === this.props.userId) 
                  ?
                  <div className="outgoingMessage">
                    <p>
                      {message.content}
                    </p>
                    <span className="messageDate">{ this.parseDate(message.createdAt) }</span>
                  </div>
                  :
                  <div className="incomingMessage">
                    <p> {message.user.userName}: <span className="messageDate">{ this.parseDate(message.createdAt) }</span></p>
                    <p> {message.content} </p>
                  </div>
              }
            </div>
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
  userName: getUserName(state),
  firstNewMessage: getFirstNewMessage(state)
})

const mapDispatchToProps = { addNewChatMessage }

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
