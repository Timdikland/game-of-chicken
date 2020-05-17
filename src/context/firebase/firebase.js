import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyAMC-ruO6afcSg02zqycKwmz8gEhsXl8KA",
  authDomain: "game-of-chicken.firebaseapp.com",
  databaseURL: "https://game-of-chicken.firebaseio.com",
  projectId: "game-of-chicken",
  storageBucket: "game-of-chicken.appspot.com",
  messagingSenderId: "164226384888",
  appId: "1:164226384888:web:f76ca737a9c4b348cbcc0d",
  measurementId: "G-Q7RSJCGTPE",
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    /* Helper */
    this.serverValue = app.database.ServerValue;

    /* Firebase APIs */
    this.auth = app.auth();
    this.db = app.database();
    this.functions = app.functions();
  }

  // *** Auth API ***
  doSignInWithDisplayName = (displayName) => {
    this.auth
      .signInAnonymously()
      .then((result) => {
        result.user.updateProfile({
          displayName: displayName,
        });
        this.user(result.user.uid).set({
          uid: result.user.uid,
          displyName: displayName,
        });
      })
      .catch((err) => console.log(err));
  };

  doSignOut = () => this.auth.signOut();

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        next(authUser);
      } else {
        fallback();
      }
    });

  // *** User API ***
  users = () => this.db.ref("users");
  user = (uid) => this.db.ref(`users/${uid}`);

  // *** Game API ***
  games = () => this.db.ref("games");
  game = (gameId) => this.db.ref(`games/${gameId}`);
  gamePlayers = (gameId) => this.db.ref(`games/${gameId}/players`);
  gamePlayer = (gameId, userId) =>
    this.db.ref(`games/${gameId}/players/${userId}`);
  gameOffers = (gameId) => this.db.ref(`games/${gameId}/offers`);
  gameItemsForUser = (gameId, uid) =>
    this.db.ref(`games/${gameId}/items/${uid}`);
  gameValuesForUser = (gameId, uid) =>
    this.db.ref(`games/${gameId}/values/${uid}`);

  // *** Initialize Game ***

  doAssignValues = (gameId, userId) => {
    return this.gameValuesForUser(gameId, userId).set({
      red: 1,
      yellow: 2,
      green: 3,
      blue: 4,
    });
  };

  doAssignItems = (gameId, userId) => {
    return this.gameItemsForUser(gameId, userId).set({
      red: 4,
      yellow: 3,
      green: 3,
      blue: 4,
    });
  };

  doInitializeGame = (gameId) => {
    // fetch all players
    // initialize values for players
    // initialize items for players
    // set game to started (if game is started users are redirected to gameBoard)
    // make it "impossible" to join game
    return this.gamePlayers(gameId)
      .once("value")
      .then((snapshot) => {
        const promises = [];
        Object.keys(snapshot.val()).forEach((uid) => {
          const assignValues = this.doAssignValues(gameId, uid);
          const doAssignItems = this.doAssignItems(gameId, uid);
          promises.push(assignValues);
          promises.push(doAssignItems);
        });
        return Promise.all(promises);
      })
      .catch((err) => console.log(err));
  };

  // *** Game Trade API ***

  doCreateOffer = (gameId, ask, bid, offerFrom, offerTo) => {
    this.gameOffers(gameId).push({
      ask: ask,
      bid: bid,
      offerFrom: offerFrom,
      offerTo: offerTo,
    });
  };
}

export default Firebase;
