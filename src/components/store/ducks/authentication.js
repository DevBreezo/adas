/**
 * Types
 */
const Types = {
  AUTHENTICATION_STARTED: "AUTHENTICATION_STARTED",
  AUTHENTICATION_COMPLETED: "AUTHENTICATION_COMPLETED"
};

/**
 * Action Creator
 */
export const authenticationAction = (email, password) => {
  return dispatch => {
    dispatch({ type: Types.AUTHENTICATION_STARTED });
    dispatch({
      type: Types.AUTHENTICATION_COMPLETED,
      payload: {
        email,
        password,
        token: "12345678910"
      }
    });
  };
};

/**
 * Initial State
 */
const INITIAL_STATE = {
  email: null,
  password: null,
  token: null
};

/**
 * Reducer
 */
export const authenticationReducer = (state = INITIAL_STATE, action) => {
  if (action.type === Types.AUTHENTICATION_STARTED) {
    return state;
  }
  if (action.type === Types.AUTHENTICATION_COMPLETED) {
    return (state = {
      email: action.payload.email,
      password: action.payload.password,
      token: action.payload.token
    });
  }
  return state;
};
