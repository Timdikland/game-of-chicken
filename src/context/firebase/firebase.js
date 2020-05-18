import {
  v4 as uuidv4
} from "uuid";
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

    this.serverValue = app.database.ServerValue;

    this.auth = app.auth();
    this.db = app.database();
    this.functions = app.functions();
  }

  // *** User API ***
  users = () => this.db.ref("users");
  user = (uid) => this.db.ref(`users/${uid}`);

  // *** Game API ***
  games = () => this.db.ref("games");
  game = (gameId) => this.db.ref(`games/${gameId}`);
  gamePlayers = (gameId) => this.db.ref(`games/${gameId}/players`);
  gamePlayer = (gameId, userId) =>
    this.db.ref(`games/${gameId}/players/${userId}`);
  gameMetadata = (gameId) => this.db.ref(`games/${gameId}/meta`);
  gameOffers = (gameId) => this.db.ref(`games/${gameId}/offers`);
  gameOffer = (gameId, offerId) =>
    this.db.ref(`games/${gameId}/offers/${offerId}`);
  gameOfferDeclines = (gameId, offerId) =>
    this.db.ref(`games/${gameId}/offers/${offerId}/declinedBy`);
  gameOfferAccepts = (gameId, offerId) =>
    this.db.ref(`games/${gameId}/offers/${offerId}/acceptedBy`);
  gameItemsForUser = (gameId, uid) =>
    this.db.ref(`games/${gameId}/items/${uid}`);
  gameValuesForUser = (gameId, uid) =>
    this.db.ref(`games/${gameId}/values/${uid}`);

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
          displayName: displayName,
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

  // *** Lobby actions ***

  doCreateNewGame = (userId) => {
    const uuid = uuidv4();
    const gameId = this.games().push().key;
    return this.gameMetadata(gameId)
      .set({
        isStarted: false,
        isActive: true,
        joinCode: uuid.split("-")[1],
      })
      .then(() => this.doAddPlayerToGame(userId, gameId))
      .then(() => Promise.resolve(gameId))
      .catch((err) => console.log(err));
  };

  doAddPlayerToGame = (userId, gameId) => {
    this.user(userId)
      .once("value")
      .then((snapshot) => {
        const user = snapshot.val();
        return this.gamePlayer(gameId, userId).set({
          displayName: user.displayName,
          isReady: false,
        });
      })
      .catch((err) => console.log(err));
  };

  // *** GameRoom actions

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

  doUpdateItems = (gameId, userId, changeSet) => {
    return this.gameItemsForUser(gameId, userId)
      .once("value")
      .then((snapshot) => {
        const oldItems = {
          ...snapshot.val()
        };
        const newItems = {
          ...snapshot.val()
        };
        Object.keys(changeSet).forEach((key) => {
          newItems[key] = oldItems[key] + changeSet[key];
        });
        return this.gameItemsForUser(gameId, userId).set(newItems);
      })
      .catch((err) => console.log(err));
  };

  doRemoveOffer = (gameId, offerId) => {
    return this.gameOffer(gameId, offerId).remove();
  };

  doAcceptOffer = (gameId, offerId, AcceptedByUserId) => {
    // Change The items of the bidder
    // Change the items of the asker
    // mark offer as accepted
    this.gameOffer(gameId, offerId)
      .once("value")
      .then((snapshot) => {
        const toChangeSet = {};
        const fromChangeSet = {};
        const offer = snapshot.val();

        Object.keys(offer.bid).forEach((key) => {
          fromChangeSet[key] = offer.bid[key] - offer.ask[key];
          toChangeSet[key] = offer.ask[key] - offer.bid[key];
        });

        const p1 = this.doUpdateItems(gameId, offer.offerFrom, fromChangeSet);
        const p2 = this.doUpdateItems(gameId, AcceptedByUserId, toChangeSet);
        return Promise.all([p1, p2]);
      })
      .then((res1, res2) => this.doRemoveOffer(gameId, offerId))
      .catch((err) => console.log(err));
  };

  doDeclineOffer = (gameId, offerId, userId) =>
    this.gameOfferDeclines(gameId, offerId).push(userId);
}

export default Firebase;