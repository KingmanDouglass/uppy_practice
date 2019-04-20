import React, { Component } from 'react';
import SendMessage from './SendMessage'
import MessageList from './MessageList'
//GO TO DOTENV
const roomId = process.env.roomId
const testToken = process.env.testToken
const username = process.env.username
const instanceLocator = process.env.instanceLocator




class Chat extends Component {
    constructor() {
        super()
        this.state = {
            messages: []
        }
        this.sendMessage = this.sendMessage.bind(this)
    } 
    
    componentDidMount() {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator: instanceLocator,
            userId: username,
            tokenProvider: new Chatkit.TokenProvider({
                url: testToken
            })
        })
        
        chatManager.connect()
        .then(currentUser => {
            this.currentUser = currentUser
            this.currentUser.subscribeToRoom({
            roomId: roomId,
            hooks: {
                onNewMessage: message => {

                    this.setState({
                        messages: [...this.state.messages, message]
                    })
                }
            }
        })
      })
    }
    
    sendMessage(text) {
        this.currentUser.sendMessage({
            text,
            roomId: roomId
        })
    }
    
    render() {
        return (
            <div className="app">
              <Chat />
              <MessageList 
                  roomId={this.state.roomId}
                  messages={this.state.messages} />
              <SendMessage
                  sendMessage={this.sendMessage} />
            </div>
        );
    }
}

export default (Chat);