require('./bootstrap');
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware, compose } from 'redux';

import { Provider } from 'react-redux';
import rootReducer from './Store/Reducers/rootReducer';
import thunk from 'redux-thunk';
//import { getFirestore } from 'redux-firestore';
//import {reactReduxFirebase, getFirebase } from 'react-redux-firebase';
//import fbConfig from './Config/fbConfig';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore'; // <- needed if using firestore
//import 'firebase/functions'; // <- needed if using httpsCallable
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore'; // <- needed if using firestore

const fbConfig = {
	apiKey: 'AIzaSyCmPkCciz57jTAC6k5j0PacTgxSc9DsgSY',
	authDomain: 'rima-189f6.firebaseapp.com',
	databaseURL: 'https://rima-189f6.firebaseio.com',
	projectId: 'rima-189f6',
	storageBucket: 'rima-189f6.appspot.com',
	messagingSenderId: '468286416863'
};

const rrfConfig = {
	userProfile: 'users',
	useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
	//attachAuthIsReady: true
};

firebase.initializeApp(fbConfig);

//Initialize other services on firebase instance
firebase.firestore(); // <- needed if using firestore
//firebase.functions() // <- needed if using httpsCallable

const initialState = {};

//const store = createStore(rootReducer, initialState)

const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(thunk)
		//.withExtraArgument()
		//reduxFirestore(fbConfig)
		//reduxReactFirebase(fbConfig)
		//)
		//	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

const rrfProps = {
	firebase,
	config: rrfConfig,
	dispatch: store.dispatch,
	createFirestoreInstance // <- needed if using firestore
};
//console.log(firebase.auth());
firebase.auth().onAuthStateChanged(function(user) {
	//let unsubscribe =
	//if (user) -> store.dispatch(signInUser(user)).then(() => renderDom())
	//else -> renderDom()
	ReactDOM.render(
		<Provider store={store}>
			<ReactReduxFirebaseProvider {...rrfProps}>
				<App />
			</ReactReduxFirebaseProvider>
		</Provider>,
		document.getElementById('root')
	);
	//unsubscribe();
});
serviceWorker.unregister();
