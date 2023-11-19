const getUser = () => {
  const jsonUser = localStorage.getItem("currentUser");
  if (jsonUser) {
    const user = JSON.parse(jsonUser);
    if (jsonUser && user) {
      return user;
    }
  }
  return null;
};

const initialState = {
  sidebar: false,
  info: "meal",
  currentUser: getUser(),
  tempUser: null,
};

export default initialState;
