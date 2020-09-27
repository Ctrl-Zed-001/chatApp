import React, { useState, useEffect } from 'react'
import db from "./firebase"
import { Link } from "react-router-dom"
import Navbar from "./Navbar"
import { connect } from "react-redux"
import NewChatModal from './NewChatModal'
import { useHistory } from "react-router-dom"

const AllChats = (props) => {

    const [chats, setChats] = useState([]);

    const history = useHistory()


    useEffect(
        () => {
            if (!props.user.name) {
                history.push("/")
            } else {
                db.collection("chats")
                    .onSnapshot(snapshot => {
                        setChats(snapshot.docs.map(doc => {
                            return { id: doc.id, ...doc.data() }
                        }))
                    })
            }
            return () => {
                setChats([])
            }
        }, []
    )

    return (
        <>
            <Navbar title="QuickChat" avatar="" back="false" />
            <NewChatModal />
            <div className="all_chats container-fluid">
                {
                    chats.map(chat => {
                        return (

                            <div key={chat.id} className="row p-2 border-bottom pointer chat_hover">
                                <div className="col-3">
                                    <img alt="chat user dp" className="rounded-circle img-fluid mx-auto" src={chat.image} />
                                </div>
                                <div className="col-9">
                                    <Link to={`/chat/${chat.id}`}>
                                        <h3 className="mt-4">{chat.name}</h3>
                                    </Link>
                                </div>
                            </div>

                        )
                    })
                }
            </div >
            <button data-toggle="modal" data-target="#newChatModal" className="btn shadow text-white fab bg-custom rounded-circle position-fixed mb-4"> <i className="fa fa-plus"></i></button>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state
    }
}

export default connect(mapStateToProps)(AllChats)
