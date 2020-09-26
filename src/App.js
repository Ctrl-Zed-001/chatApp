import React, { useState, useRef, useEffect } from 'react'
import Message from "./Message"
import Navbar from './Navbar'
import db from "./firebase"
import firebase from "firebase"

const App = () => {

    const [field, setField] = useState("");
    const [user, setUser] = useState("");
    const [messages, setMessages] = useState([])

    const inputRef = useRef();

    useEffect(
        () => {
            // FOCUS ON TH INPT FIELD ON APP START
            inputRef.current.focus();

            // PROMPT FOR USER NAME
            setUser(prompt("Please enter your name."))
        }, []
    )

    useEffect(
        () => {
            db.collection("messages")
                .orderBy("timestamp", "asc")
                .onSnapshot(snapshot => {
                    setMessages(snapshot.docs.map(doc => {
                        return doc.data()
                    }))
                })
        }, []
    )

    const handleChange = (e) => {
        setField(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // ADD NE MESSAGE TO DB
        if (field !== "") {
            db.collection("messages").add({
                user: user,
                message: field,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            // CLEAR THE INPUT FIELD
            setField("");
            // AUTO SCROLL THE PAGE
            document.getElementById("chat_app").scrollTop = document.getElementById("chat_app").scrollHeight + 100
        }
    }

    return (
        <div className="chat_app" id="chat_app">
            <Navbar />

            <div className="chat_screen">
                {
                    messages.map(msg => {
                        return (<Message message={msg} user={user} />)
                    })
                }
            </div>

            <div className="message-box w-100 p-2 fixed-bottom">

                <div className="input-group">
                    <textarea ref={inputRef} rows="1" value={field} onChange={handleChange} type="text" className="border-0 shadow-sm form-control rounded-pill" placeholder="Type a message..." ></textarea>
                    <button onClick={handleSubmit} className="shadow-sm ml-2 input-group-text send_button rounded-circle">
                        <img alt="send_button" src="/send_button.svg" className="img-fluid" />
                    </button>
                </div>
            </div>

        </div>
    )
}

export default App
