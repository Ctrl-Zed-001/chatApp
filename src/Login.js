import React from 'react'
import { auth, provider } from "./firebase"
import { useHistory } from "react-router-dom"
import { connect } from "react-redux"

const Login = (props) => {


    const history = useHistory()

    const signin = () => {

        auth.signInWithPopup(provider)
            .then(res => {
                props.login(res.additionalUserInfo.profile);
                history.push("/chat");
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="container login-screen">
            <div className="row">
                <div className="col-12">
                    <div className="login-box text-center align-middle">
                        <img src="/logo512.png" className="mt-4 img-fluid" alt="login-logo" /><br />
                        <button onClick={signin} className="mt-4 btn btn-outline-danger rounded-pill px-4"><i className="fab fa-google p-2"></i><b> Login With Google</b></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (profile) => dispatch({ type: "SIGNIN", payload: profile })
    }
}

export default connect(null, mapDispatchToProps)(Login)
