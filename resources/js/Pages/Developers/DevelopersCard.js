import React, { Component } from 'react';
import './DevelopersCard.scss';
export class DevelopersCard extends Component {
	render() {
		return (
			<div className="DevelopersCard container">
				<div className="media">
					<img className="mr-3" src="images/agency.jpg" alt="Generic placeholder" />
					<div className="media-body">
						<h5 className="mt-0 text-primary">Open Doors</h5>
						<div className="row">
							<div className="col-sm-6 col-md-4 col-lg-3">
								<span className="">(+995) 514 908 181</span>
								<br />
								<span className="">პეკინის გამზ. 34</span>
							</div>
							<div className="col-sm-6 col-md-4 col-lg-3">
								<span className="">opendoors@gmail.com</span>
								<br />
								<span className="">opendoors.ge</span>
							</div>
							<div className="col-sm-6 col-md-4 col-lg-3">
								<span className="">5 აგენტი</span>
								<br />
								<span className="">574 განცხადება</span>
							</div>
						</div>

						<div className="buttons">
							<button className="btn btn-primary">დაუკავშირდი</button>
							<button className="btn btn-secondary">კატალოგი</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default DevelopersCard;
