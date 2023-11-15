export const actionType = {
  CHANGE_INFO: "CHANGE_INFO",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.CHANGE_INFO:
      return {
        ...state,
        info: state.info === "meal" ? "fund" : "meal",
      };

    default:
      return state;
  }
};

export default reducer;
