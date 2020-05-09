import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { database } from "../../services/firebase.js";

function Home() {
  const [username, setUsername] = useState("");
  const usernameRef = database.ref("users/");
  const history = useHistory();

  const handleChange = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    usernameRef.set({ username: username });
    history.push("/lobby");
  };

  return (
    <div>
      <p>{"Home Page: Enter your username"}</p>
      <input value={username} onChange={(e) => handleChange(e)} />
      <button onClick={(e) => handleSubmit(e)}>{"Let's go!"}</button>
    </div>
  );
}

export default Home;
