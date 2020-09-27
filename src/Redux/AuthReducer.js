const initState = {}

const AuthReducer = (state = initState, action) => {
    switch (action.type) {
        case "SIGNIN":
            return action.payload
        default: return state;
    }
}

export default AuthReducer