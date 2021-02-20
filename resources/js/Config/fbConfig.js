import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
var config = {
	apiKey: 'AIzaSyCmPkCciz57jTAC6k5j0PacTgxSc9DsgSY',
	authDomain: 'rima-189f6.firebaseapp.com',
	databaseURL: 'https://rima-189f6.firebaseio.com',
	projectId: 'rima-189f6',
	storageBucket: 'rima-189f6.appspot.com',
	messagingSenderId: '468286416863'
};
firebase.initializeApp(config);
firebase.firestore(); //.settings({ timestampsInSnapshots: true });
export default firebase;
