import React, { useState, useContext } from "react";
import { Button } from "semantic-ui-react";

import { FirebaseContext } from "../../context/firebase";

function FunctionButton() {
  const [response, setResponse] = useState(null);
  const firebase = useContext(FirebaseContext);

  const startFunction = () => {
    const helloWorld = firebase.functions.httpsCallable("helloWorld");
    helloWorld()
      .then((result) => setResponse(result))
      .catch((err) => console.log(err));
  };

  const callF = () => {
    const startGame = firebase.functions.httpsCallable("addItem");
    startGame({ item: "hello world" })
      .then((result) => setResponse(result))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Button onClick={() => startFunction()}> Start functie</Button>
      <p>{JSON.stringify(response)}</p>
    </div>
  );
}

export default FunctionButton;
