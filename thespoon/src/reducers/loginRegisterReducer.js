import * as LogInRegisterActions from "../actions/logInRegisterActions";
import initialState from "./initialState";

const loginRegisterReducer = (state = initialState, action) => {
    switch(action.type) {
        case LogInRegisterActions.REGISTERING_ATTEMPTING:
            return Object.assign({}, state, {
                username: action.username,
                email: action.email,
                name: action.name,
                surname: action.surname,
                password: action.password,
                loginStatus: 'logging in'
            });
        case LogInRegisterActions.REGISTERING_FAILING:
            return Object.assign({}, state, {
                loginStatus: 'not logged in'
            });
        case LogInRegisterActions.REGISTERING_SUCCESSING:
            return Object.assign({}, state, {
                username: action.username,
                loginStatus: 'logged in'
            });
        case LogInRegisterActions.LOGGING_IN_ATTEMPTING:
            return Object.assign({}, state, {
                username: action.username,
                role: action.role,
                loginStatus: 'logging in'
            });
        case LogInRegisterActions.LOGGING_IN_FAILING:
            return Object.assign({}, state, {
                loginStatus: 'not logged in'
            });
        case LogInRegisterActions.LOGGING_IN_SUCCESSING:
            return Object.assign({}, state, {
                token: action.token,
                loginStatus: 'logged in'
            });
        case LogInRegisterActions.LOGGING_OUT:
            return Object.assign({}, state, {
                loginStatus: 'not logged in'
            });
        default:
            return Object.assign({}, state, {
                loginStatus: 'not logged in'
            });
    }
};

export default loginRegisterReducer;