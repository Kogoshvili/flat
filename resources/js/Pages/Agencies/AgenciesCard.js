import React, { Component } from 'react';
import './AgenciesCard.scss';
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';

export class AgenciesCard extends Component {
	render() {
		const data = this.props.data;

		return (
			<div className="AgenciesCard container">
				<div className="media">
					<Link to={'/agency/' + data.id}>
						<img
							className="mr-3"
							src={data.logo ? data.logo : 'images/agency.jpg'}
							alt="Generic placeholder"
						/>
					</Link>
					<div className="media-body">
						<Link to={'/agency/' + data.id}>
							<h5 className="mt-0 text-primary">{data.name}</h5>
						</Link>
						<div className="row">
							<div className="col-sm-6 col-md-4 col-lg-3">
								<a href={'tel:' + data.phone} className="dark">
									<CurrencyFormat
										format="(+995) ###-##-##-##"
										displayType={'text'}
										value={data.phone}
									/>
								</a>
								<br />
								{data.location}
							</div>
							<div className="col-sm-6 col-md-4 col-lg-3">
								<a href={'mailto:' + data.email} className="dark">
									{data.email}
								</a>
								<br />
								<a href={'http://' + data.site} className="dark">
									{data.site}
								</a>
							</div>

							<div className="col-sm-6 col-md-4 col-lg-3">
								<span className="">{data.agents.length} აგენტი</span>
								<br />
								<span className="">{data.properties.length} განცხადება</span>
							</div>
						</div>

						<div className="buttons row">
							<div className="col-md-4 col-sm-4">
								<Link to={'/agency/' + data.id}>
									<button className="btn btn-primary">კატალოგი</button>
								</Link>
							</div>

							<div className="col-md-4 col-sm-4">
								{data.facebook ? (
									<a href={'http://' + data.facebook}>
										<i class="fab fa-2x fa-facebook-square mr-3" />
									</a>
								) : (
									''
								)}
								{data.instagram ? (
									<a href={'http://' + data.instagram}>
										<i class="fab fa-2x fa-instagram mr-2" />
									</a>
								) : (
									''
								)}{' '}
								{data.youtube ? (
									<a href={'http://' + data.youtube}>
										<i class="fab fa-2x fa-youtube" />
									</a>
								) : (
									''
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default AgenciesCard;
