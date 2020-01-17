import firebase from 'react-native-firebase';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

function firebaseSignUp(email, password) {
  return new Promise((resolve, reject) => {
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(({user}) => {
          resolve(user.uid);
        });
    } catch (e) {
      reject(e);
    }
  });
}

function firebaseLogin(email, password) {
  return new Promise((resolve, reject) => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(({user}) => {
          resolve(user.uid);
        });
    } catch (e) {
      reject(e);
    }
  });
}

function setSessionDetails(token, tokenDetails) {
  AsyncStorage.setItem(
    '@reactnative-graphql:session',
    JSON.stringify({
      token: token,
      id: tokenDetails?.claims?.user_id,
      exp: tokenDetails?.claims?.exp,
    }),
  );
}

async function watchAuthStateChange() {
  return firebase.auth().onAuthStateChanged(async user => {
    if (user) {
      let token = await user.getIdToken();
      const idTokenResult = await user.getIdTokenResult();
      const hasuraClaim = idTokenResult.claims['https://hasura.io/jwt/claims'];

      if (hasuraClaim) {
        setSessionDetails(token, idTokenResult);
      } else {
        // Check if refresh is required.
        const metadataRef = firebase
          .database()
          .ref('metadata/' + user.uid + '/refreshTime');

        metadataRef.on('value', async () => {
          // Force refresh to pick up the latest custom claims changes.
          token = await user.getIdToken(true);
          setSessionDetails(token, idTokenResult);
        });
      }
    }
  });
}

function uploadImageToFirebase(uri, folderName) {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const sessionId = new Date().getTime();
    const imageRef = firebase
      .storage()
      .ref(folderName)
      .child(`${sessionId}`);
    imageRef
      .put(uploadUri)
      .then(() => imageRef.getDownloadURL())
      .then(url => resolve(url))
      .catch(error => reject(error));
  });
}

export {
  firebaseSignUp,
  firebaseLogin,
  watchAuthStateChange,
  uploadImageToFirebase,
};
