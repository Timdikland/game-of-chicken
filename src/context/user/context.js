import React, { useState, useContext, useEffect } from "react";

import { FirebaseContext } from "../firebase";

const UserContext = React.createContext(null);

export const withUser = (component) => (props) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const firebase = useContext(FirebaseContext);

  const handleUser = (newUser) => {
    localStorage.setItem("authUser", JSON.stringify(newUser));
    setUser(newUser);
  };

  const handleNoUser = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    res = firebase.onAuthUserListener(handleUser, handleNoUser);
    return () => res();
  });

  return (
    <UserContext.Provider value={user}>
      <Component {...props} />
    </UserContext.Provider>
  );
};

export default UserContext;
