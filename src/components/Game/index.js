import React, { useContext } from "react";
// import { useList } from "react-firebase-hooks/database";
// import { useParams } from "react-router-dom";

// import { database } from "../../services/firebase";

import { GameContext } from "../../context/game";

import Score from "../Score";
import Inventory from "../Inventory";
import Offers from "../Offers";

import NewOffer from "../NewOffer";
import { Grid } from "semantic-ui-react";

function Game() {
  //   const gameListRef = database.ref("/games");
  //   const userListRef = database.ref("/users");
  //   const params = useParams();

  //   const [snapshots, loading, error] = useList(userListRef);

  //   const startGame = () => {
  //     gameListRef.push({ gameId: "24" });
  //   };

  //   return (
  //     <div>
  //       <h1>Welcome to the game</h1>
  //       <p>{params}</p>
  //       <button onClick={() => startGame()}>Start game</button>
  //       {snapshots.map((value) => {
  //         return <p>{value.val()}</p>;
  //       })}
  //     </div>
  //   );

  //   return (
  //     <div>
  //       <p>
  //         {error && <strong>Error: {error}</strong>}
  //         {loading && <span>List: Loading...</span>}
  //         {!loading && snapshots && (
  //           <React.Fragment>
  //             <span>
  //               List:{" "}
  //               {snapshots.map((v) => (
  //                 <div>
  //                   <p>{v.key}</p>
  //                   <p>{v.val()}</p>
  //                 </div>
  //               ))}
  //             </span>
  //           </React.Fragment>
  //         )}
  //       </p>
  //     </div>
  //   );

  const gameState = useContext(GameContext);

  return (
    <Grid center container>
      <Grid.Row>
        <Grid.Column>
          <Score score={[1, 2, 3, 4]} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Offers />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Inventory score={[1, 2, 3, 4]} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>{JSON.stringify(gameState)}</Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Game;
