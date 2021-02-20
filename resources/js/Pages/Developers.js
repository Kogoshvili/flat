import React, { Component } from 'react';
import './Developers/Developers.scss';
import DevelopersCard from './Developers/DevelopersCard';
export class Developers extends Component {
	render() {
		return (
			<div className="Developers">
				<h3 className="border-bottom">დეველოპერები</h3>
				<DevelopersCard />
				<DevelopersCard />
				<DevelopersCard />
				<DevelopersCard />
				<DevelopersCard />
				<DevelopersCard />
				<DevelopersCard />
				<DevelopersCard />
				<DevelopersCard />
				<DevelopersCard />
				<DevelopersCard />
				<DevelopersCard />
				<DevelopersCard />
			</div>
		);
	}
}

export default Developers;
