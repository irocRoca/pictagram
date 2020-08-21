import { combineReducers } from "redux";

const initalState = {
  message: "",
};

const initalUser = {
  login: false,
  user: {},
};

const errorsReducer = (state = initalState, action) => {
  switch (action.type) {
    case "CLEAR_ERRORS":
      return { ...state, message: "" };
    case "ERROR":
      return { ...state, message: action.payload };

    default:
      return state;
  }
};

const userReducer = (state = initalUser, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, login: true, user: action.payload };
    case "LOGOUT":
      return { ...state, login: false, user: null };
    default:
      return state;
  }
};

export default combineReducers({ errors: errorsReducer, user: userReducer });
