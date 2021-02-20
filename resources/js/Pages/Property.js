import React, { Component } from 'react';
import './Property/Property.scss';
import PropertySlider from './Property/PropertySlider';
import PropertyCard from '../Components/PropertyCard';
import Gmaps from '../Components/Gmaps';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, isEmpty, withFirestore } from 'react-redux-firebase';
import { compose } from 'redux';
import Axios from 'axios';
import { NavLink, Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import windowSize from 'react-window-size';

//import Convert from '../Components/Convert';
export class Property extends Component {
	constructor() {
		super();
		this.state = {
			windowWidth: 1920,
			cur: false,
			data: null,
			images: [],
			agent: null,
			money: 0,
			cur: '$'
		};
		this.currency = this.currency.bind(this);
	}
	componentDidMount() {
		if (this.props.windowWidth > 1200 !== this.state.windowWidth > 1200) {
			this.setState({
				windowWidth: this.props.windowWidth
			});
		}
		const id = this.props.match.params.property_id;
		//console.log('agent', this.props.agent);
		Axios.get('https://flatrima.herokuapp.com/api/properties/' + id)
			.then((res) => {
				this.props.firestore
					.collection('users')
					.doc(res.data.agentID)
					.get()
					.then((mes) => {
						this.setState({
							data: res.data,
							agent: mes.data(),
							images: JSON.parse(res.data.images),
							money: res.data.price,
							cur: res.data.currency === 'USD' ? '$' : '₾'
						});
					})
					.catch((e) => console.log(e));
			})
			.catch((e) => console.log(e));
	}
	shouldComponentUpdate(nextProps) {
		console.log(nextProps.windowWidth);
		if (
			nextProps.windowWidth !== this.props.windowWidth &&
			nextProps.windowWidth > 770 !== this.state.windowWidth > 770
		) {
			this.setState({
				windowWidth: nextProps.windowWidth
			});
		}
		return true;
	}
	currency() {
		this.setState((prevState) => {
			return {
				cur: !prevState.cur
			};
		});
	}
	onRemove = (data) => {
		console.log('pageRemove', data);

		this.props.removeProperty(data, this.props);
	};
	exchange = () => {
		this.setState((prevState) => {
			return {
				money: Math.round(prevState.cur === '$' ? prevState.money * 2.7 : prevState.money / 2.7),
				cur: prevState.cur === '$' ? '₾' : '$'
			};
		});
	};
	render() {
		const { data, images, agent } = this.state;

		if (data === null) {
			return <div>Loading...</div>;
		} else if (data === '') {
			return <div>Empty</div>;
		} else {
			return (
				<div>
					<div className="container Property">
						<PropertySlider images={images} />
						{this.props.auth.uid && this.props.auth.uid === data.agentID ? (
							<div>
								<button
									onClick={() => this.onRemove(data.id)}
									className="btn btn-danger"
									style={{ marginRight: '5px', cursor: 'pointer' }}
								>
									წაშლა
								</button>
								<Link to={'/edit/' + data.id}>
									<button className="btn btn-secondary">რედაქტირება</button>
								</Link>
							</div>
						) : (
							''
						)}
						{this.state.windowWidth <= 770 ? (
							<p className="border-bottom">
								{data.streetGe} {data.address}, {data.districtGe}, {data.cityGe}
								<span className="property-id">ID: {data.id}</span>
							</p>
						) : (
							<h5 className="border-bottom">
								{data.streetGe} {data.address}, {data.districtGe}, {data.cityGe}
								<span className="property-id">ID: {data.id}</span>
							</h5>
						)}
						<div className="row">
							<div className="col-sm-12 col-md-12 col-lg-4">
								<div className="Property-main-agent media">
									<div id="jsagent" className="">
										<Link to={'/agent/' + data.agentID}>
											<img src={agent.image || 'images/agent.png'} alt="" />
										</Link>
									</div>
									<div className="media-body">
										<Link to={'/agent/' + data.agentID}>
											<span className="text-primary">
												{agent.firstName} {agent.lastName}
											</span>
										</Link>
										<br />
										<a href={'tel:' + agent.phone}>
											<span className="">
												<CurrencyFormat
													format="(+995) ###-##-##-##"
													displayType={'text'}
													value={agent.phone}
												/>
											</span>
										</a>
										<br />
										<Link to={'/agency/' + data.agencyID}>
											<span className="">{agent.agencyName}</span>
										</Link>
									</div>
								</div>
								<div className="row">{this.props.auth.uid == data.agentID ? data.comment : ''}</div>
							</div>
							<div className="col-sm-12 col-md-12 col-lg-8">
								<div className=" Property-main-info row">
									<div
										className="col-sm-5 col-12 order-sm-1 order-1 Property-main-info-status"
										style={{ textAlign: this.props.screenWidth > 576 ? 'left' : 'center' }}
									>
										{data.contractGe} {data.categoryGe ? data.categoryGe : 'მიწის ნაკვეთი'} <br />
										{data.statusGe} <br />
										{data.conditionGe}
									</div>
									<div className="col-sm-3 col-6 order-sm-2 order-2 Property-main-info-rooms">
										{data.rooms || '?'} ოთახი <br />
										{data.bedrooms || '?'} საძინებელი <br />
										{data.bathrooms || '?'} საპირფარეშო
									</div>
									<div className="col-sm-4 col-6 order-sm-3 order-3 Property-main-info-price">
										<span id="area">
											{data.area} მ<sup>2</sup>
										</span>
										<br />
										<span id="price" style={{ cursor: 'pointer' }} onClick={this.exchange}>
											<CurrencyFormat
												value={this.state.money}
												displayType={'text'}
												thousandSeparator={true}
												prefix={this.state.cur === '$' ? '$' : '₾'}
											/>
											<i className="fas fa-sync-alt" />
											{/* <i className="fas fa-arrow-down" /> */}
										</span>
										<br />
										<span id="priceper">
											<CurrencyFormat
												value={Math.round(this.state.money / data.area)}
												displayType={'text'}
												thousandSeparator={true}
												prefix={this.state.cur === '$' ? '$' : '₾'}
											/>
											/მ<sup>2</sup>
										</span>
										{/* <div
											className="currencies"
											style={{ display: this.state.cur ? 'block' : 'none' }}
										>
											{data.currency !== 'GEL' ? (
												<div>
													<h5 className="text-primary">
														{data.price}L
														<span className="ml-4 text-s">
															1,742$/m<sup>2</sup>
														</span>
													</h5>
												</div>
											) : (
												''
											)}
											{data.currency !== 'USD' ? (
												<div>
													<h5 className="text-primary">
														{data.price}$
														<span className="ml-4 text-s">
															1,742$/m<sup>2</sup>
														</span>
													</h5>
												</div>
											) : (
												''
											)} */}
										{/* {data.currency !== 'EUR' ? (
												<div>
													<h5 className="text-primary">
														{data.price}€
														<span className="ml-4 text-s">
															1,549€/m<sup>2</sup>
														</span>
													</h5>
												</div>
											) : (
												''
											)}
											{data.currency !== 'RUB' ? (
												<div>
													<h5 className="text-primary">
														<Convert from={data.currency} to="RUB" val={data.price} />₽
														<span className="ml-4 text-s">
															113,668₽/м<sup>2</sup>
														</span>
													</h5>
												</div>
											) : (
												''
											)}</div> */}
									</div>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-12 col-md-12 col-lg-8 order-lg-2">
								{data.textGe ? (
									<div>
										<h5 className="col-xs-12 col-lg-12 border-bottom">აღწერა</h5>
										<p>{data.textGe}</p>
									</div>
								) : (
									''
								)}
								<div className="row add-info">
									<h5 className="col-xs-12 col-lg-12 border-bottom">დამატებითი ინფორმაცია</h5>
									<div className="col-sm-6 col-md-4">
										<ul className="fa-ul">
											{data.heating && data.heating.value !== null ? (
												<li>
													<span className="fa-li">
														<i className="icon-sushi fas fa-thermometer-three-quarters  fa-lg" />
													</span>
													<span>გათბობა: {data.heatingGe}</span>
												</li>
											) : (
												''
											)}
											{data.hotWater && data.hotWater.value !== null ? (
												<li>
													<span className="fa-li">
														<i className="icon-sushi fas fa-hot-tub fa-lg" />
													</span>
													<span>წყლის გაცხელება: {data.hotWaterGe}</span>
												</li>
											) : (
												''
											)}
											{data.conditioner ? (
												<li>
													<span className="fa-li">
														<i className="icon-sushi fas fa-temperature-low fa-lg" />
													</span>
													<span>კონდიციონერი</span>
												</li>
											) : (
												''
											)}
											{data.eBalcony ? (
												<li>
													<span className="fa-li">
														<i className="icon-sushi far fa-object-ungroup fa-lg" />
													</span>
													<span>
														აივანი {data.balcony} მ<sup>2</sup>
													</span>
												</li>
											) : (
												''
											)}
											{data.veranda ? (
												<li>
													<span className="fa-li">
														<i className="icon-sushi far fa-object-ungroup fa-lg" />
													</span>
													<span>
														ვერანდა {data.veranda} მ<sup>2</sup>
													</span>
												</li>
											) : (
												''
											)}
											{data.loggia ? (
												<li>
													<span className="fa-li">
														<i className="icon-sushi far fa-object-ungroup fa-lg" />
													</span>
													<span>
														ლოჯია {data.loggia} მ<sup>2</sup>
													</span>
												</li>
											) : (
												''
											)}
										</ul>
									</div>
									<div className="col-sm-6 col-md-4">
										<ul className="fa-ul">
											{data.floors ? (
												<li>
													<span className="fa-li">
														<i className="icon-sushi fas fa-layer-group fa-lg" />
													</span>
													<span>
														{data.category.value !== 'house' &&
														data.category.value !== 'land' ? data.floor !== null ? (
															data.floor + '/'
														) : (
															'?/'
														) : (
															''
														)}
														{data.floors} სართული
													</span>
												</li>
											) : (
												''
											)}
											{data.elevator ? (
												<li>
													<span className="fa-li">
														<i className="icon-sushi far fa-caret-square-up fa-lg" />
													</span>
													<span>ლიფტი</span>
												</li>
											) : (
												''
											)}
											{data.internet ? (
												<li>
													<span className="fa-li">
														<i className="icon-sushi fas fa-ethernet fa-lg" />
													</span>
													<span>ინტერნეტი</span>
												</li>
											) : (
												''
											)}
											{data.television ? (
												<li>
													<span className="fa-li">
														<i className="icon-sushi fas fa-tv fa-lg" />
													</span>
													<span>ტელევიზია</span>
												</li>
											) : (
												''
											)}
											{data.telephone ? (
												<li>
													<span className="fa-li">
														<i className="icon-sushi fas fa-phone fa-lg" />
													</span>
													<span>ტელეფონი</span>
												</li>
											) : (
												''
											)}
											{data.gas ? (
												<li>
													<span className="fa-li">
														<i className="icon-sushi fas fa-burn fa-lg" />
													</span>
													<span>ბუნებრივი აირი</span>
												</li>
											) : (
												''
											)}
										</ul>
									</div>
									<div className="col-sm-6 col-md-4">
										<ul className="fa-ul">
											{data.ceiling ? (
												<li>
													<span className="fa-li">
														<i className="icon-sushi fas fa-arrows-alt-v fa-lg" />
													</span>
													<span>ჭერის სიმაღლე: {data.ceiling} მ</span>
												</li>
											) : (
												''
											)}
											{data.fireplace ? (
												<li>
													<span className="fa-li">
														<i className="icon-sushi fas fa-fire fa-lg" />
													</span>
													<span>ბუხარი</span>
												</li>
											) : (
												''
											)}
											{data.furniture ? (
												<li>
													<span className="fa-li">
														<i className="icon-sushi fas fa-couch fa-lg" />
													</span>
													<span>ავეჯი</span>
												</li>
											) : (
												''
											)}
											{data.electronics ? (
												<li>
													<span className="fa-li">
														<i className="icon-sushi fas fa-microchip fa-lg" />
													</span>
													<span>ტექნიკა</span>
												</li>
											) : (
												''
											)}
											{data.parking && data.parking.value !== null ? (
												<li>
													<span className="fa-li">
														<i className="icon-sushi fas fa-parking fa-lg" />
													</span>
													<span>პარკინგი: {data.parkingGe}</span>
												</li>
											) : (
												''
											)}
											{data.storeroom && data.storeroom.value !== null ? (
												<li>
													<span className="fa-li">
														<i className="icon-sushi fas fa-door-closed   fa-lg" />
													</span>
													<span>სათავსო: {data.storeroomGe}</span>
												</li>
											) : (
												''
											)}
										</ul>
									</div>
								</div>
							</div>
							<div className="col-sm-12 col-md-12 col-lg-4 order-lg-1 right-column">
								<div className="row">
									<div className="col-sm-12 col-md-6 col-lg-12 mb-lg-4 maps">
										<Gmaps
											disabled={true}
											location={{
												lat: data.lat,
												lng: data.lng
											}}
										/>
									</div>
									<div className="col-sm-12 col-md-6 col-lg-12 mortgage" />
								</div>
							</div>
						</div>
						{/* <h5 className="border-bottom">მსგავსი განცხადებები</h5>
							<div className="row property-similar text-center">
							<div className="col-sm-6 col-md-4 col-lg-3 p-0">
								<div style={{ width: '250px' }}>
									<PropertyCard />
								</div>
							</div>
							<div className="col-sm-6 col-md-4 col-lg-3 p-0">
								<div style={{ width: '250px' }}>
									<PropertyCard />
								</div>
							</div>
							<div className="col-sm-6 col-md-4 col-lg-3 p-0">
								<div style={{ width: '250px' }}>
									<PropertyCard />
								</div>
							</div>
							<div className="col-sm-6 col-md-4 col-lg-3 p-0">
								<div style={{ width: '250px' }}>
									<PropertyCard />
								</div>
							</div>
							<div className="col-sm-6 col-md-4 col-lg-3 p-0">
								<div style={{ width: '250px' }}>
									<PropertyCard />
								</div>
							</div>
							<div className="col-sm-6 col-md-4 col-lg-3 p-0">
								<div style={{ width: '250px' }}>
									<PropertyCard />
								</div>
							</div>
							<div className="col-sm-6 col-md-4 col-lg-3 p-0">
								<div style={{ width: '250px' }}>
									<PropertyCard />
								</div>
							</div>
							<div className="col-sm-6 col-md-4 col-lg-3 p-0">
								<div style={{ width: '250px' }}>
									<PropertyCard />
								</div>
							</div>
							<div className="col-sm-6 col-md-4 col-lg-3 p-0">
								<div style={{ width: '250px' }}>
									<PropertyCard />
								</div>
							</div>
							<div className="col-sm-6 col-md-4 col-lg-3 p-0">
								<div style={{ width: '250px' }}>
									<PropertyCard />
								</div>
							</div>
							<div className="col-sm-6 col-md-4 col-lg-3 p-0">
								<div style={{ width: '250px' }}>
									<PropertyCard />
								</div>
							</div>
							<div className="col-sm-6 col-md-4 col-lg-3 p-0">
								<div style={{ width: '250px' }}>
									<PropertyCard />
								</div>
							</div>
						</div>  */}
					</div>
				</div>
			);
		}
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		//property: state.firestore.data.property,
		auth: state.firebase.auth
		//ownProps.match.params.property_id
	};
}; //
const mapDispatchToProps = (dispatch) => {
	return {
		removeProperty: (property, ownProps) => {
			dispatch(removeProperty(property, ownProps));
		}
	};
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withFirestore)(windowSize(Property));
//
// firestoreConnect((props) => {
// 	const id = props.match.params.property_id;
// 	return [
// 		{
// 			collection: 'users',
// 			doc: id,
// 			storeAs: 'property'
// 		}
// 	];
// })
