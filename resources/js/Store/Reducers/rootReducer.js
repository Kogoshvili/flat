import authReducer from './authReducer';
import propertyReducer from './propertyReducer';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore'; // <- needed if using firestore

const rootReducer = combineReducers({
	auth: authReducer,
	properties: propertyReducer,
	form: formReducer,
	firebase: firebaseReducer,
	firestore: firestoreReducer
});
export default rootReducer;
