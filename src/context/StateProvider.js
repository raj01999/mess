import {
  useState,
  useEffect,
  createContext,
  useContext,
  useReducer,
} from "react";
import { auth, db } from "../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail as emailUpdate,
  updatePassword as PasswordUpdate,
  sendEmailVerification,
} from "firebase/auth";
import {
  collection,
  doc,
  where,
  query,
  getDocs,
  setDoc,
} from "firebase/firestore";

const StateContext = createContext();

const StateProvider = ({ reducer, initialState, children }) => {
  const [currentUser, setCurrentUser] = useState(initialState.currentUser);
  const [loading, setLoading] = useState(true);
  const userCollection = collection(db, "users");

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

  async function setUser(user) {
    await setDoc(doc(db, "users", user.email), user);
  }

  async function getUserByEmail(email) {
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0];
  }

  async function setMess(mess, id) {
    await setDoc(doc(db, "messes", id), mess);
  }

  async function getUsersByMessId(id) {
    const q = query(collection(db, "users"), where("messId", "==", id));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
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
    setUser,
    getUserByEmail,
    setMess,
    getUsersByMessId,
  };

  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
};

const useStateValue = () => useContext(StateContext);

export { StateProvider, useStateValue };
