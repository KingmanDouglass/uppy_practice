import React, { Component } from 'react';
import SendMessage from './SendMessage'
import MessageList from './MessageList'
const Chatkit = require("@pusher/chatkit-server");
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'
require('dotenv').config();
// //GO TO DOTENV


const DUMMY_DATA = [
    {
      senderId: "Kingman",
      text: "what are you wearing?"
    },
    {
      senderId: "Brad",
      text: "whatever you want me to be..."
    }
  ]


class Chat extends Component {
    
    // constructor() {
    //     super()
    //     this.state = {
    //        messages: DUMMY_DATA
    //     }
    //   }

    constructor() {
        super()
        this.state = {
            messages: []
        }
        this.sendMessage = this.sendMessage.bind(this)
    } 
    
    componentDidMount() {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator: process.env.instanceLocator,
            userId: process.env.username,
            tokenProvider: new Chatkit.TokenProvider({
                url: process.env.testToken
            })
        })
        
        chatManager.connect()
        .then(currentUser => {
            this.currentUser = currentUser
            this.currentUser.subscribeToRoom({
            roomId: process.env.roomId,
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
            roomId: process.env.roomId
        })
    }
    
    render() {
        return (
            <div className="app">
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