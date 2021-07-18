import React, { useEffect, useState, createContext } from "react";
import firebase from "../config/firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    let user = firebase.auth().currentUser;
    return user ? { user } : null;
  });

  const onChange = userData => {
    setUser(userData);
  };

  useEffect(() => {
    const user = firebase
      .auth()
      .onAuthStateChanged(user => (user ? onChange(user) : onChange(null)));

    return () => user();
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
