import { useState, useEffect } from "react";
import firebase from "../config/firebase";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    let user = firebase.auth().currentUser;
    return user ? { isAuthenticated: true } : null;
  });

  const onChange = user => {
    setIsAuthenticated(user);
  };

  useEffect(() => {
    const user = firebase
      .auth()
      .onAuthStateChanged(user => (user ? onChange(user) : onChange(null)));
    return () => user();
  }, []);

  return isAuthenticated;
};

export default useAuth;
