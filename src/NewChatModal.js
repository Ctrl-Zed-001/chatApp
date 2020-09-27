import React, { useState } from 'react'
import { storage } from "./firebase"
import db from "./firebase"

const NewChatModal = () => {

    const [image, setImage] = useState();
    const [roomname, setRoomName] = useState();

    const handleChange = (e) => {
        setRoomName(e.target.value)
    }
    const addImage = (e) => {
        setImage({
            imagefile: e.target.files[0],
            preview: URL.createObjectURL(e.target.files[0])
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const uploadTask = storage.ref(`images/${image.imagefile.name}`).put(image.imagefile)
        uploadTask.on(
            "state_changed",
            snapshot => { },
            error => {
                console.log(error)
            },
            () => {
                storage
                    .ref("images")
                    .child(image.imagefile.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection("chats").add({
                            image: url,
                            name: roomname
                        })
                    })
            }
        )

    }


    return (
        <div className="modal fade" id="newChatModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">New Chat Room</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {
                            image ?
                                <img src={image.preview} className="img-fluid" alt="chat image" /> :
                                ""
                        }
                        <div className="input-group mb-3">
                            <div className="form-file">
                                <input type="file" className="form-file-input" id="inputGroupFile02" onChange={addImage} />
                                <label className="form-file-label" htmlFor="inputGroupFile02" aria-describedby="inputGroupFileAddon02">
                                    <span className="form-file-text">Choose file...</span>
                                </label>
                            </div>
                        </div>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Enter Room Name</label>
                            <input type="text" className="form-control" onChange={handleChange} />
                        </div>
                        <button data-dismiss="modal" onClick={handleSubmit} className="btn btn-success">Add Room</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewChatModal
