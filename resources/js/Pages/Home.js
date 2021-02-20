import React, { Component } from 'react';
import './Home/Home.scss';
import Filter from '../Components/Filter';
import BodySliders from './Home/BodySliders';

import Jumbotron from './Home/Jumbotron';

export class Home extends Component {
	submit = (values) => {
		let filter = '?';
		//console.log(values);
		for (var k in values) {
			//filter[k] = values[k].value;
			filter = filter + 'filter[' + k + ']=' + values[k].value + '&';
		}

		this.props.history.push({ pathname: `/products`, state: values });
	};
	render() {
		return (
			<div className="Home-section">
				<Jumbotron />
				<div className="HomeFilter">
					<div className="text-center my-3">
						<h1>იპოვე, შენი სახლი!</h1>
					</div>
					<Filter onSubmit={this.submit} screenWidth={this.props.screenWidth} />
				</div>
				<BodySliders screenWidth={this.props.screenWidth} />
			</div>
		);
	}
}

export default Home;
