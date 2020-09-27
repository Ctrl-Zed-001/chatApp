import React from 'react'
import { Link } from "react-router-dom"

const Navbar = (props) => {
    return (
        <nav className="navbar navbar-light bg-custom shadow-sm">
            <div className="container-fluid">
                <div className="row">
                    {
                        props.back === "true" ?
                            <div className="col-1">
                                <Link to="/chat"><i className="carousel-control-prev-icon mt-backbtn"></i></Link>
                            </div> :
                            <></>
                    }
                    {
                        props.avatar !== "" ?
                            <div className="col-2">
                                <img src={props.avatar} className="img-fluid rounded-circle" />
                            </div> :
                            <></>
                    }
                    <div className="col-9">
                        <p className="mt-chatname text-white navbar-brand mb-0"><b>{props.title}</b></p>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
