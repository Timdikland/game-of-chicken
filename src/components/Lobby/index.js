import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

function Lobby() {
  const [gameId, setGameId] = useState("");
  const history = useHistory();

  const handleChange = (e) => {
    e.preventDefault();
    setGameId(e.target.value);
  };

  const createLobby = () => {
    const newGameId = "24";
    history.push(`/game/${newGameId}`);
  };

  return (
    <div>
      <p>Enter a code to join an existing Game</p>
      <input value={gameId} onChange={(e) => handleChange(e)} />
      <Link to={`/game/${gameId}`}>
        <button>Join Game</button>
      </Link>
      <p>Or create a new Lobby</p>
      <button onClick={() => createLobby()}>Create Game</button>
    </div>
  );
}

export default Lobby;
