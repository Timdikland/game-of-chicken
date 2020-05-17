import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Input, Button } from "semantic-ui-react";

import { FirebaseContext } from "../../context/firebase";
import { UserContext } from "../../context/user";

function Home() {
  const [displayName, setDisplayName] = useState("");
  const history = useHistory();

  const user = useContext(UserContext);
  const firebase = useContext(FirebaseContext);

  const handleChange = (e) => {
    e.preventDefault();
    setDisplayName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase.doSignInWithDisplayName(displayName);
    history.push("/lobby");
  };

  return (
    <div>
      <h3>{"Home Page: Enter your username"}</h3>
      <Input
        value={displayName}
        onChange={(event, data) => handleChange(event)}
      />
      <Button onClick={(event, data) => handleSubmit(event)}>
        {"Let's go!"}
      </Button>
      {JSON.stringify(user)}
    </div>
  );
}

export default Home;
