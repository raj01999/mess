import {
  useState,
  useEffect,
  createContext,
  useContext,
  useReducer,
} from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail as emailUpdate,
  updatePassword as PasswordUpdate,
  sendEmailVerification,
} from "firebase/auth";

const StateContext = createContext();

const StateProvider = ({ reducer, initialState, children }) => {
  const [currentUser, setCurrentUser] = useState(initialState.currentUser);
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateEmail(email) {
    return emailUpdate(currentUser, email);
  }

  function updatePassword(password) {
    return PasswordUpdate(currentUser, password);
  }

  function emailVerification(user) {
    return sendEmailVerification(user);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
      } else {
        localStorage.removeItem("currentUser");
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  initialState.currentUser = currentUser;
  initialState.func = {
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    emailVerification,
  };

  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
};

const useStateValue = () => useContext(StateContext);

export { StateProvider, useStateValue };
