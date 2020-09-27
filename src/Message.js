import React from 'react'

const Message = ({ timestamp, message, user, currentUser }) => {
    let time = new Date(timestamp).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    return (
        <div className="container-fluid message_bubble">
            <div className={`message my-3 p-2 text-white ${user === currentUser ? "message_sent mx-auto" : "message_recieved"}`}>
                <p className="mb-1"><b>{user} : </b></p>
                <p className="mb-0">{message}</p>
                <p className="time mb-0 mt-1">{time}</p>
            </div>
        </div>
    )
}

export default Message
