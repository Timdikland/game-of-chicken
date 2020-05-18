import React, { useState, useContext, useEffect } from "react";

import { FirebaseContext } from "../firebase";

const UserContext = React.createContext(null);

export const withUser = (Component) => (props) => {
  const [user, setUser] = useState("");
  const firebase = useContext(FirebaseContext);

  const handleUser = (newUser) => {
    setUser(newUser);
  };

  const handleNoUser = () => {
    setUser(null);
  };

  useEffect(() => {
    firebase.onAuthUserListener(handleUser, handleNoUser);
    return () => console.log("auth listener");
  });

  return (
    <UserContext.Provider value={user}>
      <Component {...props} />{" "}
    </UserContext.Provider>
  );
};

export default UserContext;
