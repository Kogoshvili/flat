import React, { Component } from 'react';
import './Properies/Properies.scss';
import ProperiesCard from './Properies/ProperiesCard';
import Gmaps from '../Components/Gmaps';
import Filter from '../Components/Filter';
import Select from 'react-select';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, isEmpty, withFirestore } from 'react-redux-firebase';
import { compose } from 'redux';
import ReactPaginate from 'react-paginate';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from 'rc-pagination';
//import 'rc-pagination/assets/index.css';
import CurrencyFormat from 'react-currency-format';
import windowSize from 'react-window-size';

const sort = [
	{ value: '-created_at', label: 'სტანდ. დალაგება' },
	{ value: 'price', label: 'ზრდადი ფასი' },
	{ value: '-price', label: 'კებადი ფასი' },
	// { value: 'Iper', label: 'ზრდადი კვ.ფასი' },
	// { value: 'Dper', label: 'კლებადი კვ.ფასი' },
	{ value: 'area', label: 'ზრდადი ფართი' },
	{ value: '-area', label: 'კლებადი ფართი' }
];
const type = [
	{ value: 'all', label: 'ყველა' },
	{ value: 'active', label: 'ჩართული' },
	{ value: 'disabled', label: 'გათიშული' },
	{ value: 'notVerified', label: 'გასააქტიურებელი' }
];
export class Products extends Component {
	state = {
		windowWidth: 1920,
		currentPage: 1,
		totalItems: 0,
		perPage: 10,
		selectedSort: { value: '-created_at', label: 'სტანდ. დალაგება' },
		filter: '',
		data: null,
		category: null,
		owner: false,
		type: { value: 'all', label: 'ყველა' },
		agency: null,
		agent: null,
		agentLst: null
	};

	componentDidMount() {
		window.scrollTo(0, 0);
		if (this.props.windowWidth > 1200 !== this.state.windowWidth > 1200) {
			this.setState({
				windowWidth: this.props.windowWidth
			});
		}
		let agencyID = '';
		if (this.props.match && this.props.match.url.includes('agency')) {
			agencyID = 'filter[agencyID]=' + this.props.match.params.agency_id + '&';
		}
		if (this.props.match && this.props.match.url.includes('agent')) {
			agencyID = 'filter[agentID]=' + this.props.match.params.agent_id + '&';
		}
		if (this.state.category !== 'land') {
			Axios.get('https://flatrima.herokuapp.com/api/properties?' + agencyID + 'sort=-priority,-created_at').then((res) => {
				console.log(res);
				this.setState({
					data: res.data.data,
					totalItems: res.data.total,
					perPage: res.data.per_page
				});
			});
		} else {
			Axios.get('https://flatrima.herokuapp.com/api/lands?' + agencyID + 'sort=-priority,-created_at').then((res) => {
				console.log(res);
				this.setState({
					data: res.data.data,
					totalItems: res.data.total,
					perPage: res.data.per_page
				});
			});
		}
	}
	shouldComponentUpdate(nextProps, nextState) {
		let agencyID = '';
		let type = '';
		if (
			nextProps.windowWidth !== this.props.windowWidth &&
			nextProps.windowWidth > 1200 !== this.state.windowWidth > 1200
		) {
			this.setState({
				windowWidth: nextProps.windowWidth
			});
		}
		if (this.state.type !== nextState.type) {
			if (nextState.type.value === 'all') type = '';
			if (nextState.type.value === 'active') type = 'filter[active]=1&';
			if (nextState.type.value === 'disabled') type = 'filter[active]=0&';
			if (nextState.type.value === 'notVerified') type = 'filter[verified]=0&';
		}
		if (this.props.match && this.props.match.url.includes('agency')) {
			agencyID = 'filter[agencyID]=' + this.props.match.params.agency_id + '&';
			if (this.state.agency === null || this.props.match.params.agency_id !== nextProps.match.params.agency_id)
				this.props.firestore
					.collection('agencies')
					.doc(this.props.match.params.agency_id)
					.get()
					.then((data) => {
						const agency = data.data();
						this.getAgents(agency.agents);
						this.setState({ agency });
					})
					.catch((e) => console.log('err', e));
		} else if (this.state.agency !== null) {
			this.setState({ agency: null });
		}
		if (this.props.match && this.props.match.url.includes('agent')) {
			agencyID = 'filter[agentID]=' + this.props.match.params.agent_id + '&';
			if (this.state.agent === null || this.props.match.params.agency_id !== nextProps.match.params.agency_id)
				this.props.firestore
					.collection('users')
					.doc(this.props.match.params.agent_id)
					.get()
					.then((data) => {
						this.setState({ agent: data.data() });
					})
					.catch((e) => console.log('err', e));
			if (this.props.auth.uid && this.props.auth.uid === this.props.match.params.agent_id) {
				if (!this.state.owner) this.setState({ owner: true });
			} else {
				if (this.state.owner) this.setState({ owner: false });
			}
		} else {
			if (this.state.agent !== null) this.setState({ agent: null });
		}

		if (
			(this.state.filter !== nextState.filter && nextState.filter !== null) ||
			this.state.selectedSort !== nextState.selectedSort ||
			nextProps.match.url !== this.props.match.url ||
			this.state.currentPage !== nextState.currentPage ||
			this.state.type !== nextState.type
		) {
			if (nextState.category !== 'land') {
				Axios.get(
					'https://flatrima.herokuapp.com/api/properties?' +
						agencyID +
						nextState.filter +
						type +
						'sort=-priority,' +
						nextState.selectedSort.value +
						'&page[number]=' +
						nextState.currentPage
				).then((res) => {
					this.setState({ data: res.data.data, totalItems: res.data.total, perPage: res.data.per_page });
				});
			} else {
				Axios.get(
					'https://flatrima.herokuapp.com/api/lands?' +
						agencyID +
						nextState.filter +
						type +
						'sort=-priority,' +
						nextState.selectedSort.value +
						'&page[number]=' +
						nextState.currentPage
				).then((res) => {
					console.log(res);
					this.setState({ data: res.data.data, totalItems: res.data.total, perPage: res.data.per_page });
				});
			}
		}

		return true;
	}
	handleChange = (e, x) => {
		this.setState({
			[x]: e
		});
	};
	submit = (values) => {
		let filter = '';
		if (Array.isArray(values.street)) {
			delete values.district;
		}
		if (values.category) {
			this.setState({ category: values.category.value });
			if (values.category.value === 'land') {
				delete values.category;
			}
		}

		for (var k in values) {
			if (k === 'city' || k === 'district' || k === 'street') {
				if (Array.isArray(values[k])) {
					filter = filter + 'filter[' + k + 'Ge]=';
					values[k].map((e) => (filter = filter + e.label + ','));
					filter = filter.substring(0, filter.length - 1);
					filter = filter + '&';
				} else {
					filter = filter + 'filter[' + k + 'Ge]=' + values[k].label + '&';
				}
			} else if (k.includes('area') || k.includes('price')) {
				filter = filter + k + '=' + values[k] + '&';
			} else {
				filter = filter + 'filter[' + k + ']=' + values[k].value + '&';
			}
		}
		this.setState({ filter });
	};
	onChangePage = (page) => {
		window.scrollTo(0, 0);
		console.log('page', page);
		this.setState({
			currentPage: page
		});
	};
	getAgents(agents) {
		let requests = agents.map((agent) => {
			return new Promise((resolve) => {
				this.props.firestore
					.collection('users')
					.doc(agent)
					.get()
					.then((data) => {
						let data2 = data.data();
						data2.id = agent;
						resolve(data2);
					})
					.catch((e) => console.log('err', e));
			});
		});
		Promise.all(requests).then((data) => {
			console.log(data);
			this.setState({ agentLst: data });
		});
	}
	render() {
		const { data } = this.state;
		let elements;
		if (data === null) {
			elements = 'loading';
		} else if (data === []) {
			elements = 'empty';
		} else {
			elements = data.map((property) => {
				return <ProperiesCard key={property.id} property={property} />;
			});
		}
		let label = (
			<div className="text-center my-3">
				<h1>იპოვე, შენი სახლი!</h1>
			</div>
		);

		if (this.state.agency !== null) {
			let agency = this.state.agency;
			//this.getAgents(agency.agents);
			let agentList = '';
			if (this.state.agentLst) {
				agentList = this.state.agentLst.map((agent) => {
					if (agent.verified) {
					} else {
						return (
							<div className="col-xs-6 col-sm-4 col-md-4 col-lg-1 text-center">
								<div>
									<Link to={'/agent/' + agent.id}>
										<img
											src={agent.image || 'images/agent.png'}
											alt="image"
											style={{ height: '100px', maxWidth: '100px' }}
										/>
									</Link>
									<br />
								</div>
								{agent.firstName || ''} {agent.lastName || ''}
							</div>
						);
					}
				});
			}
			label = (
				<div className="container-fluid">
					<div className="AgenciesCard container" style={{ border: 'none' }}>
						<div className="media">
							<img
								className="mr-3"
								src={agency.logo ? agency.logo : 'images/agency.jpg'}
								alt="Generic placeholder"
							/>
							<div className="media-body">
								<h5 className="mt-0 text-primary">{agency.name}</h5>
								<div className="row">
									<div className="col-sm-6 col-md-4 col-lg-3">
										<a href={'tel:' + agency.phone} className="dark">
											<CurrencyFormat
												format="(+995) ###-##-##-##"
												displayType={'text'}
												value={agency.phone}
											/>
										</a>
										<br />
										<span className="">{agency.location}</span>
									</div>
									<div className="col-sm-6 col-md-4 col-lg-3">
										<a href={'mailto:' + agency.email} className="dark">
											{agency.email}
										</a>
										<br />
										<a href={'http://' + agency.site} className="dark">
											{agency.site}
										</a>
									</div>
									<div className="col-sm-6 col-md-4 col-lg-3">
										{agency.facebook ? (
											<a href={'http://' + agency.facebook}>
												<i className="fab fa-2x fa-facebook-square mr-3" />
											</a>
										) : (
											''
										)}
										{agency.instagram ? (
											<a href={'http://' + agency.instagram}>
												<i className="fab fa-2x fa-instagram mr-2" />
											</a>
										) : (
											''
										)}{' '}
										{agency.youtube ? (
											<a href={'http://' + agency.youtube}>
												<i className="fab fa-2x fa-youtube" />
											</a>
										) : (
											''
										)}
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="row justify-content-center">{agentList}</div>
				</div>
			);
		} else if (this.state.agent !== null) {
			let agent = this.state.agent;
			// label = (
			// 	<div className="text-center mb-3">
			// 		<h1>{this.state.agent.firstName + ' ' + this.state.agent.lastName}</h1>
			// 	</div>
			// );
			label = (
				<div className="row" style={{ paddingTop: '20px' }}>
					<div className="media" style={{ margin: '0 auto' }}>
						<img
							className="mr-3"
							style={{ width: '100px' }}
							src={agent.image || 'images/agent.png'}
							alt="Generic placeholder"
						/>
						<div className="media-body">
							<h5 className="mt-2 text-primary font-weight-bold">
								{agent.firstName} {agent.lastName}
							</h5>
							<h6 className="">{agent.phone}</h6>
							<br />
							<Link to={'/agency/' + agent.agency}>
								<span className="">{agent.agencyName}</span>
							</Link>
						</div>
					</div>
				</div>
			);
		}

		return (
			<div>
				<div className="ProductsBg">
					<div
						className="ProductsFilter"
						style={{
							margin: this.state.windowWidth <= 1200 ? '0px 0px 20px 0px' : '50px 100px 20px 100px'
						}}
					>
						{label}

						<Filter
							loc={this.props.history.location}
							onSubmit={this.submit}
							selected={this.props.location.state}
							screenWidth={this.props.screenWidth}
						/>
					</div>
				</div>
				{/* this.props.auth.uid && this.props.auth.uid === property.agentID */}
				<div className="container">
					<div className="row" style={{ marginBottom: '20px' }}>
						<div className="col-xs-12 col-sm-6 col-md-3 pull-xs-left text-center text-sm-left">
							<Select
								theme={(theme) => ({
									...theme,
									borderRadius: 0,
									colors: {
										...theme.colors,
										primary25: 'rgba(252, 136, 22, 0.25)',
										primary: 'rgba(252, 136, 22, 1)'
									}
								})}
								styles={{ width: '200%' }}
								className="sort"
								value={this.state.selectedSort}
								onChange={(e) => this.handleChange(e, 'selectedSort')}
								options={sort}
								isSearchable={this.props.screenWidth <= 576}
							/>
						</div>
						{this.state.owner ? (
							<div className="col-xs-12 col-sm-6 col-md-3 pull-xs-left text-center text-sm-left">
								<Select
									theme={(theme) => ({
										...theme,
										borderRadius: 0,
										colors: {
											...theme.colors,
											primary25: 'rgba(252, 136, 22, 0.25)',
											primary: 'rgba(252, 136, 22, 1)'
										}
									})}
									styles={{ width: '200%' }}
									className="sort"
									value={this.state.type}
									onChange={(e) => this.handleChange(e, 'type')}
									options={type}
									isSearchable={this.props.screenWidth <= 576}
								/>
							</div>
						) : (
							''
						)}
					</div>
					<div className="row">
						<div className="col-xs-12 col-md-12 col-lg-8">{elements}</div>
						<div className="col-lg-4" style={{ marginBottom: '20px' }}>
							<Gmaps disabled={true} />
						</div>
						<div style={{ margin: '0 auto' }}>
							<Pagination
								onChange={this.onChangePage}
								current={this.state.currentPage}
								total={this.state.totalItems}
								pageSize={this.state.perPage}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile
	};
};

export default compose(
	connect(mapStateToProps),
	withFirestore
	// firestoreConnect((props) => {
	// 	//console.log('fire', props.filter);
	// 	let filter = [
	// 		{
	// 			collection: 'properties',
	// 			where: [ [ 'active', '==', true ] ],
	// 			//orderBy: [ [ 'priority', 'desc' ], [ 'createdAt', 'desc' ] ],
	// 			//storeAs: 'filtered',
	// 			limit: 20
	// 		}
	// 	];
	// 	if (props.filter) {
	// 		if (props.filter.values) {
	// 			if (props.filter.values.category) {
	// 				//console.log(props.filter.values.category.value);
	// 				//filter[0].storeAs = 'filtered';
	// 				filter[0].where.push([ 'category.value', '==', props.filter.values.category.value ]);
	// 			}
	// 		}
	// 	}
	// 	//console.log(filter);
	// 	return filter;
	// })
)(windowSize(Products));
