import React, { Component } from 'react';
import './Agencies/Agencies.scss';
import AgenciesCard from './Agencies/AgenciesCard';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, isEmpty, withFirestore } from 'react-redux-firebase';
import { compose } from 'redux';
export class Agencies extends Component {
	state = {
		currentPage: 1,
		totalItems: 0,
		perPage: 10,
		agencies: null
	};
	componentDidMount() {
		this.props.firestore
			.collection('agencies')
			.get()
			.then((querySnapshot) => {
				let lst = [];
				querySnapshot.forEach(function(doc) {
					// doc.data() is never undefined for query doc snapshots
					let dt = doc.data();
					dt.id = doc.id;
					lst.push(dt);
				});
				this.setState({ agencies: lst });
			})
			.catch((e) => console.log(e));
	}
	render() {
		//console.log(this.state.agencies);

		if (this.state.agencies === null) {
			return <div>EEEE</div>;
		} else {
			const agnLst = this.state.agencies.map((agncy) => {
				return <AgenciesCard data={agncy} />;
			});
			return (
				<div className="Agencies">
					<h3 className="border-bottom">სააგენტოები</h3>
					{agnLst}
				</div>
			);
		}
	}
}

export default compose(withFirestore)(Agencies);
