import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { auth, database } from "../../services/firebase.js";

function Home() {
  const [displayName, setDisplayName] = useState("");
  const history = useHistory();

  const createUser = (displayName) => {
    auth
      .signInAnonymously()
      .then((result) => {
        console.log(result);
        result.user.updateProfile({
          displayName: displayName,
        });
      })
      .catch((err) => console.log("error", err));
  };

  const addUserToDatabase = (user) => {
    database.ref("users").set({
      uid: user.uid,
      displayName: user.displayName,
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setDisplayName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(displayName);
    addUserToDatabase();
    // history.push("/lobby");
  };

  return (
    <div>
      <p>{"Home Page: Enter your username"}</p>
      <input value={displayName} onChange={(e) => handleChange(e)} />
      <button onClick={(e) => handleSubmit(e)}>{"Let's go!"}</button>
    </div>
  );
}

export default Home;
