import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore' // <- needed if using firestore
import auth from './auth'

export default combineReducers({
  // auth,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});
