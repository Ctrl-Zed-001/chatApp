import React from 'react'

const Message = ({ message, user }) => {
    return (
        <div className="container-fluid message_bubble">
            <div className={`message my-3 p-2 text-white ${message.user === user ? "message_sent mx-auto" : "message_recieved"}`}>
                <p className="mb-0">{message.message}</p>
            </div>
        </div>
    )
}

export default Message
