export const actionType = {
  CHANGE_INFO: "CHANGE_INFO",
  CHANGE_SIDEBAR: "CHANGE_SIDEBAR",
  SET_USER: "SET_USER",
  SET_TEMP_USER: "SET_TEMP_USER",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.CHANGE_INFO:
      return {
        ...state,
        info: state.info === "meal" ? "fund" : "meal",
      };

    case actionType.CHANGE_SIDEBAR:
      return {
        ...state,
        sidebar: action.value,
      };

    case actionType.SET_USER:
      return {
        ...state,
        currentUser: action.user,
      };

    case actionType.SET_TEMP_USER:
      return {
        ...state,
        tempUser: action.tempUser,
      };

    default:
      return state;
  }
};

export default reducer;
