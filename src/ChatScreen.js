import React, { useState, useEffect, useRef } from 'react'
import Message from "./Message"
import db from "./firebase"
import { useParams, useHistory } from "react-router-dom"
import Navbar from "./Navbar"
import { connect } from "react-redux"
import firebase from "firebase"

const ChatScreen = (props) => {

    const inputRef = useRef();

    const [field, setField] = useState()
    const [chatinfo, setChatinfo] = useState({})
    const [messages, setMessages] = useState([])
    const { roomid } = useParams()
    const history = useHistory()

    // AUTO FOCUSSING THE CHAT INPUT FIELD
    useEffect(
        () => {
            // IF USER NOT LOGGED IN THEN REDIRECT TO LOGIN PAGE

            inputRef.current.focus()
        }, []
    )


    useEffect(
        () => {
            if (!props.user.name) {
                history.push("/")
            } else {
                // GETTING CHAT INFO
                db.collection("chats")
                    .doc(roomid)
                    .onSnapshot(snapshot => {
                        setChatinfo(snapshot.data());
                    });


                // GETTING THE MESSAGES
                db.collection("chats")
                    .doc(roomid)
                    .collection("messages")
                    .orderBy("timestamp", "asc")
                    .onSnapshot(snapshot => {
                        setMessages(snapshot.docs.map(doc => {
                            console.log(doc.data())
                            return doc.data()
                        }))
                    })
            }

            return () => {
                setChatinfo({})
                setMessages([])
            }
        }, []
    )

    // SETTING THE FIELD STATE ON CHANGE
    const handleChange = (e) => {
        setField(e.target.value)
    }


    // SUBMITTING THE CHAT TO DB
    const handleSubmit = (e) => {

        e.preventDefault();

        // ADD NEW MESSAGE TO DB
        if (field !== "") {
            db.collection("chats")
                .doc(roomid)
                .collection("messages")
                .add({
                    message: field,
                    timestamp: Date.now(),
                    user: props.user.name
                })

            // CLEAR THE INPUT FIELD
            setField("");
        }
    }
    return (
        <>
            <Navbar title={chatinfo.name} avatar={chatinfo.image} back="true" />
            <div className="chat_screen">
                {
                    messages.map(msg => {
                        return (<Message key={msg.timestamp} timestamp={msg.timestamp} message={msg.message} user={msg.user} currentUser={props.user.name} />)
                    })
                }


                <div className="message-box w-100 p-2 fixed-bottom">

                    <div className="input-group">
                        <textarea ref={inputRef} rows="1" value={field} onChange={handleChange} type="text" className="border-0 shadow-sm form-control rounded-pill" placeholder="Type a message..." ></textarea>
                        <button onClick={handleSubmit} className="shadow-sm ml-2 input-group-text send_button rounded-circle">
                            <img alt="send_button" src="/send_button.svg" className="img-fluid" />
                        </button>
                    </div>
                </div>
            </div>
        </>

    )
}

const mapStateToProps = (state) => {
    return {
        user: state
    }
}

export default connect(mapStateToProps)(ChatScreen)
