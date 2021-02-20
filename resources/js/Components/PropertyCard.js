import React, { Component } from 'react';
import { Animated } from 'react-animated-css';
import './PropertyCard.scss';
import { Link } from 'react-router-dom';
import { firestoreConnect, isLoaded, isEmpty, withFirestore } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import CurrencyFormat from 'react-currency-format';

export class PropertyCard extends Component {
	state = {
		active: false,
		logo: null
	};
	shouldComponentUpdate() {
		if (this.props.property.agencyID)
			this.props.firestore
				.collection('agencies')
				.doc(this.props.property.agencyID)
				.get()
				.then((res) => this.setState({ logo: res.data().logo }))
				.catch((e) => console.log('err', e));
		return true;
	}
	render() {
		const { id, area, price } = this.props.property;
		const props = this.props.property;
		//console.log(this.props);

		//console.log(id);
		//console.log(this.props);

		//console.log(props);
		let img;
		if (this.props.property.images !== '[]' && this.props.property.images !== '')
			img = JSON.parse(this.props.property.images)[0];
		else {
			img = './images/placeholder.jpg';
		}
		//console.log(typeof JSON.parse(this.props.property.images));
		//console.log(this.props.property.images);
		///console.log(typeof images);
		//console.log(images === null ? 'yes' + images : 'nu' + images);
		//console.log(images[0]);

		return (
			<div
				className="card-element"
				onMouseOver={() => this.setState({ active: true })}
				onMouseOut={() => this.setState({ active: false })}
				onTouchMove={() => this.setState({ active: true })}
				onTouchEnd={() => this.setState({ active: false })}
			>
				<Link to={'/property/' + id}>
					<div className="front">
						<div
							className="card-img"
							style={{
								//background: 'url(./images/placeholder.jpg)' //'url(' + img + ')'
							}}
						>
							<img src={img} alt="" />
						</div>

						<div className="info">
							<div className="top">
								<span className="left">
									{area} მ<sup>2</sup>
								</span>
								<span className="right">
									<CurrencyFormat
										value={props.price}
										displayType={'text'}
										thousandSeparator={true}
										prefix={props.currency === 'USD' ? '$' : '₾'}
									/>
								</span>
							</div>
							<div className="bottom">
								<p>
									{props.district !== null && props.districtGe}, {props.cityGe} <br />{' '}
									{props.street !== null && props.streetGe}
								</p>
							</div>
						</div>
					</div>
					<Animated
						style={{ position: 'absolute', zIndex: '3', top: '0px' }}
						className="back"
						animationIn="slideInUp"
						animationOut="slideOutDown"
						isVisible={this.state.active}
						animateOnMount={false}
					>
						<div className="back-text">
							{this.state.logo ? <img src={this.state.logo} alt="" /> : ''}
							<table className="table">
								<tbody>
									{props.rooms ? (
										<tr>
											<th scope="row">
												<i className="icon-sushi far fa-clone fa-lg" />
											</th>
											<td>{props.rooms} ოთახი</td>
										</tr>
									) : (
										<tr />
									)}
									{props.floors ? (
										<tr>
											<th scope="row">
												<i className="icon-sushi fas fa-layer-group fa-lg" />
											</th>
											<td>
												{props.floor !== null ? props.floor + '/' : '?/'}
												{props.floors} სართული
											</td>
										</tr>
									) : (
										<tr />
									)}
									{props.status ? (
										<tr>
											<th scope="row">
												<i className="icon-sushi fas fa-hourglass-half fa-lg" />
											</th>
											<td>{props.statusGe}</td>
										</tr>
									) : (
										<tr />
									)}
									{props.quality ? (
										<tr>
											<th scope="row">
												<i className="icon-sushi fas fa-clipboard-check fa-lg" />
											</th>
											<td>{props.qualityGe}</td>
										</tr>
									) : (
										<tr />
									)}
								</tbody>
							</table>
						</div>
					</Animated>
				</Link>
			</div>
		);
	}
}
export default compose(withFirestore)(PropertyCard);
