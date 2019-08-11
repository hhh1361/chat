import React, { Component } from 'react'
import Input from '../input/input'
import Message from '../message/message'

const URL = 'ws://st-chat.shas.tel'

class Chat extends Component {
  state = {
    name: 'RA',
    messages: [],
  }

  socket = new WebSocket(URL)

  componentDidMount() {
    this.socket.onopen = (e) => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
    }

    this.socket.onmessage = e => {
      // on receiving a message, add it to the list of messages
      console.log(e.data)
      const message = JSON.parse(e.data)
      this.addMessage(message)
    }

    this.socket.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
      console.log(1)
      this.setState({
        socket: new WebSocket(URL),
      })
      console.log(2)
    }
  }

  addMessage = message =>
    this.setState(state => ({ messages: [message, ...state.messages] }))

  submitMessage = messageString => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    const message = { name: this.state.name, message: messageString }
    this.socket.send(JSON.stringify(message))
    this.addMessage(message)
  }

  render() {
    return (
      <div>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            id={'name'}
            placeholder={'Enter your name...'}
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
        </label>
        <Input
          socket={this.socket}
          onSubmitMessage={messageString => this.submitMessage(messageString)}
        />
        {this.state.messages.map((message, index) =>
          <Message
            key={index}
            message={message.message}
            name={message.name}
          />,
        )}
      </div>
    )
  }
}

export default Chat