import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

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
  allUsers = () => this.db.ref("users");
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
}

export default Firebase;
