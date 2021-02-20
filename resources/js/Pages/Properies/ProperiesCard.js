import React, { Component } from 'react';
import './ProperiesCard.scss';
import { reactReduxFirebase } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { editProperty, removeProperty } from '../../Store/Actions/PropertyActions';
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import { firestoreConnect, isLoaded, isEmpty, withFirestore } from 'react-redux-firebase';
import { compose } from 'redux';
import Axios from 'axios';
export class Card extends Component {
	state = {
		active: 1,
		verified: 1
	};
	// shouldComponentUpdate(nextProps) {
	// 	const property = this.props.property;
	// 	if (property.active !== nextProps.active || property.verified !== nextProps.verified) {
	// 		return true;
	// 	}
	// 	return true;
	// }
	componentDidMount() {
		const pro = this.props.property;
		this.setState({
			active: pro.active,
			verified: pro.verified
		});
	}
	onActive = (name, i) => {
		let data = {};
		if (name === 'active') data.active = i;
		else {
			data.verified = 1;
			data.active = 1;
		}
		Axios.put(
			'https://flatrima.herokuapp.com/api/' +
				(this.props.property.category !== 'land' ? 'properties/' : 'lands/') +
				this.props.property.id,
			data
		).then((res) => {
			console.log(res);
			this.setState(data);
		});
	};

	onRemove = (data) => {
		console.log('pageRemove', data);

		this.props.removeProperty(data, this.props);
	};
	render() {
		const { property } = this.props;

		const { priority } = property;
		const images = JSON.parse(this.props.property.images);

		return (
			<div className="row products-card">
				<div className="col-xxs-12 col-xs-4 col-sm-4 col-md-4 col-lg-4 products-img">
					<Link to={'/property/' + property.id}>
						<img
							src={images[0] ? images[0] : './images/placeholder.jpg'}
							alt=""
							style={{ maxWidth: '100%' }}
						/>
					</Link>
				</div>

				<div className="col-xxs-12 col-xs-8 col-sm-8 col-md-8 col-lg-8 products-info-top">
					<Link to={'/property/' + property.id}>
						<span className="products-address text-sushi">
							{property.districtGe}, {property.street && property.streetGe} {property.address}
						</span>
					</Link>
					<div className="row ">
						<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
							<span className="text-primary" style={{ letterSpacing: '1px' }}>
								<CurrencyFormat
									value={property.price}
									displayType={'text'}
									thousandSeparator={true}
									prefix={property.currency === 'USD' ? '$' : '₾'}
								/>
							</span>
							<span className="price-per" style={{ letterSpacing: '0.07rem' }}>
								<CurrencyFormat
									value={Math.round(property.price / property.area)}
									displayType={'text'}
									thousandSeparator={true}
									prefix={property.currency === 'USD' ? '$' : '₾'}
								/>
								/მ<sup>2</sup>
							</span>
						</div>
						<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
							<span className="text-primary text-right" style={{ letterSpacing: '1px' }}>
								<CurrencyFormat value={property.area} displayType={'text'} thousandSeparator={true} />
								მ<sup>2</sup>
							</span>
						</div>
					</div>
					<div className="row">
						<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 " style={{ paddingRight: '0' }}>
							<i className="icon-sushi fas fa-hourglass-half" /> {property.statusGe}
							<br />
							{property.quality ? (
								<React.Fragment>
									<i className="icon-sushi fas fa-clipboard-check" /> {property.qualityGe}
								</React.Fragment>
							) : (
								''
							)}
						</div>
						<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
							{property.floors || property.floor ? (
								<React.Fragment>
									<i className="icon-sushi fas fa-layer-group " />
									{property.floor !== null ? property.floor + '/' : '?/'}
									{property.floors} სართული
								</React.Fragment>
							) : (
								''
							)}
							<br />
							{property.rooms ? (
								<React.Fragment>
									<i className="icon-sushi far fa-object-group " /> {property.rooms} ოთახი
								</React.Fragment>
							) : (
								''
							)}
						</div>
					</div>

					<div className="products-text">
						<p>{property.textGe ? property.textGe.substring(0, 100) : ''}</p>
					</div>
					<span className="properties__boost">Tier {priority}</span>
					{this.props.auth.uid && this.props.auth.uid === property.agentID ? (
						<React.Fragment>
							<span onClick={() => this.onRemove(property.id)} className="properties__remove">
								წაშლა
							</span>
							<Link to={'/edit/' + property.id}>
								<span className="properties__edit">რედაქტირება</span>
							</Link>
							{this.state.verified === 0 ? (
								<span className="properties__active" onClick={() => this.onActive('verified', 1)}>
									მიღება
								</span>
							) : this.state.active === 0 ? (
								<span className="properties__active" onClick={() => this.onActive('active', 1)}>
									ჩართვა
								</span>
							) : (
								<span className="properties__active" onClick={() => this.onActive('active', 0)}>
									გამორთვა
								</span>
							)}
						</React.Fragment>
					) : (
						''
					)}
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state, ownProps) => {
	return {
		auth: state.firebase.auth
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		editProperty: (property, ownProps) => {
			dispatch(editProperty(property, ownProps));
		},
		removeProperty: (property, ownProps) => {
			dispatch(removeProperty(property, ownProps));
		}
	};
};
const enhance = compose(withFirestore, connect(mapStateToProps, mapDispatchToProps));

export default enhance(Card);
