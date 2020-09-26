import React from 'react'

const Message = ({ message, user }) => {
    let time = new Date(message.timestamp).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

    return (
        <div className="container-fluid message_bubble">
            <div className={`message my-3 p-2 text-white ${message.user === user ? "message_sent mx-auto" : "message_recieved"}`}>
                <p className="mb-0">{message.message}</p>
                <p className="time mb-0 mt-1">{time}</p>
            </div>
        </div>
    )
}

export default Message
