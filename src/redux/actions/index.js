export const loginAction = (user) => {
    return {
      type: "LOGIN",
      payload: user,
    };
  };
  
  export const logoutAction = () => {
    return {
      type: "LOGOUT",
    };
  };
  
  export const createError = (err) => {
    return {
      type: "ERROR",
      payload: err,
    };
  };
  
  export const clearError = () => {
    return {
      type: "CLEAR_ERRORS",
    };
  };