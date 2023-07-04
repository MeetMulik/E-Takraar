export const actionType = {
  SET_USER: "SET_USER",
  SET_COMPLAINTS: "SET_COMPLAINTS",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionType.SET_COMPLAINTS:
      return {
        ...state,
        complaints: action.complaints,
      };
    default:
      return state;
  }
};

export default reducer;
