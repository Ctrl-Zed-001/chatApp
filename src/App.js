import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'



// COMPONENTS
import ChatScreen from "./ChatScreen"
import AllChats from './AllChats'
import Login from './Login'

const App = () => {

    return (
        <div className="chat_app" id="chat_app">

            <Router>
                <Switch>
                    <Route exact path="/">
                        <Login />
                    </Route>
                    <Route exact path="/chat">
                        <AllChats />
                    </Route>
                    <Route exact path="/chat/:roomid" >
                        <ChatScreen />
                    </Route>
                </Switch>
            </Router>

        </div>
    )
}

export default App
