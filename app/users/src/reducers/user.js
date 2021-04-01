import { LOGIN, LOGOUT } from "../action/user";

const initialState = {
  token: localStorage.token ? localStorage.token : null,
  email: localStorage.token ? localStorage.email : null,
  id: localStorage.token ? localStorage.id : null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        token: action.payload.token,
        email: action.payload.email,
        id: action.payload.id,
      };
    case LOGOUT:
      return {
        token: null,
        email: null,
        id: null,
      };

    // case REGISTER:
    //   return {
    //     ...state,
    //   };
    // case FORGOT:
    //   return {
    //     ...state,
    //   };
    // case UPDATE:
    //   return {
    //     ...state,
    //     firstname: action.payload.firstname,
    //     lastname: action.payload.lastname,
    //     address: action.payload.address,
    //     phone: action.payload.phone,
    //   };
    default:
      return state;
  }
};
