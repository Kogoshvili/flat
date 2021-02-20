import React, { Component } from 'react';
import Gmaps from '../Components/Gmaps';
import './CreateProperty/CreateProperty.scss';
import { createProperty, loadProperty, editProperty } from '../Store/Actions/PropertyActions';
import { connect } from 'react-redux';
import { withFirebase, withFirestore } from 'react-redux-firebase';
import { compose } from 'redux';
import Dropzone from 'react-dropzone';
import RenderSelectInput from '../Components/RenderSelectInput';
import { Field, reduxForm } from 'redux-form';
import RequiredInput from '../Components/RequiredInput';
import animateScrollTo from 'animated-scroll-to';
import PropertiesSlider from './Home/PropertiesSlider';
import Axios from 'axios';
import { resolve } from 'q';
const { URL } = require('url');

const categories = [
	{ value: 'apartment', label: 'ბინა' },
	{ value: 'house', label: 'სახლი' },
	{ value: 'commercial', label: 'კომერციული ფართი' },
	{ value: 'hotel', label: 'სასტუმრო' },
	{ value: 'land', label: 'მიწის ნაკვეთი' }
];
const contracts = [
	{ value: 'sell', label: 'იყიდება' },
	{ value: 'rentM', label: 'ქირავდება თვიურად' },
	{ value: 'rentD', label: 'ქირავდება დღიურად' },
	{ value: 'сollateral', label: 'გირავდება' }
];
const status = [
	{ value: 'new', label: 'ახალ აშენებული' },
	{ value: 'old', label: 'ძველი აშენებული' },
	{ value: 'wip', label: 'მშენებარე' }
];
const statusLand = [
	{ value: 'agricultural', label: 'სასოფლო სამეურნეო' },
	{ value: 'nonagricultural', label: 'არა სასოფლო სამეურნეო' },
	{ value: 'commercial', label: 'კომერციული' },
	{ value: 'special', label: 'სპეციალური' },
	{ value: 'construction', label: 'საინვესტიციო/სამშენებლო' }
];
const conditions = [
	{ value: 'new', label: 'ახალი გარემონტებული' },
	{ value: 'old', label: 'ძველი გარემონტებული' },
	{ value: 'needs', label: 'სარემონტო' },
	{ value: 'under', label: 'მიმდინარე რემონტი' },
	{ value: 'green', label: 'მწვანე კარკასი' },
	{ value: 'white', label: 'თეთრი კარკასი' },
	{ value: 'black', label: 'შავი კარკასი' }
];
const heating = [
	{ value: null, label: 'არა' },
	{ value: 'central', label: 'ცენტრალური' },
	{ value: 'gas', label: 'გაზის' },
	{ value: 'electrical', label: 'დენის' },
	{ value: 'floor', label: 'იატაკის' }
];
const hotWater = [
	{ value: null, label: 'არა' },
	{ value: 'central', label: 'ცენტრალური' },
	{ value: 'gas', label: 'გაზის' },
	{ value: 'electrical', label: 'დენის' },
	{ value: 'natural', label: 'ბუნებრივი' }
];
const storeroom = [
	{ value: null, label: 'არა' },
	{ value: 'basement', label: 'სარდაფი' },
	{ value: 'loft', label: 'სხვენი' },
	{ value: 'pantry', label: 'საკუჭნაო' },
	{ value: 'outside', label: 'გარე სათავსო' },
	{ value: 'public', label: 'საერთო სათავსო' },
	{ value: 'other', label: 'სხვა' }
];
const parking = [
	{ value: null, label: 'არა' },
	{ value: 'garage', label: 'ავტოფარეხი' },
	{ value: 'private', label: 'კორპუსის პარკინგი' },
	{ value: 'public', label: 'საერთო პარკინგი' }
];
const currencies = [
	{ value: 'GEL', label: '₾' },
	{ value: 'USD', label: '$' }
	// { value: 'EUR', label: '€' },
	// { value: 'RUB', label: '₽' }
];
const required = (value) => (value ? undefined : 'Required');
//const number = (value) => (value && isNaN(Number(value)) ? 'Must be a number' : undefined);
//const float = (value) => (value && isNaN(Number(value)) ? 'Must be a number' : undefined);
const parseInt = (value) => (value === '' ? '' : parseInt(value));
const parseFlt = (value) => (value === '' ? '' : parseFloat(value));

export class CreateProperty extends Component {
	constructor() {
		super();
		this.state = {
			eBalcony: false,
			eVeranda: false,
			eLoggia: false,

			conditioner: false,
			elevator: false,
			television: false,
			telephone: false,
			internet: false,
			fireplace: false,
			furniture: false,
			electronics: false,

			category: null,
			contract: null,

			status: null,
			condition: null,

			city: null,
			district: null,
			street: null,
			address: null,

			cadastral: null,
			lat: null,
			lng: null,

			area: null,
			yard: null,
			rooms: null,
			bedrooms: null,
			bathrooms: null,
			floor: null,
			floors: null,
			ceiling: null,

			balcony: null,
			veranda: null,
			loggia: null,

			heating: { label: 'არა' },
			hotWater: { label: 'არა' },
			parking: { label: 'არა' },
			storeroom: { label: 'არა' },

			textGe: null,
			textEn: null,
			textRu: null,
			images: [],
			oldImg: [],
			currency: { value: 'GEL', label: '₾' },
			sAgency: null
		};
	}
	componentDidMount() {
		const id = this.props.match.params.property_id;
		console.log('id:' + id);
		//this.props.auth.uid ? false : true;

		if (id) {
			Axios.get('https://flatrima.herokuapp.com/api/properties/' + id).then((data) => {
				data = data.data;

				if (data.images !== null && data.images !== '[]') {
					data.images = JSON.parse(data.images);
					let imgLst = [];
					const prs = data.images.map((img, index) => {
						console.log('IMG', img);

						return new Promise((resolve) => {
							var xhr = new XMLHttpRequest();
							xhr.responseType = 'blob';
							xhr.onload = function(event) {
								var blob = xhr.response;
								var reader = new FileReader();
								reader.readAsDataURL(blob);
								reader.onloadend = function() {
									var base64data = reader.result;
									imgLst.push({ id: index, src: base64data });
									resolve();
								};
							};
							xhr.open('GET', img);
							xhr.send();
						});
					});
					Promise.all(prs)
						.then(() => {
							this.setState({ images: imgLst });
						})
						.catch((e) => console.log('eee2', e));
				}
			});
			this.props.loadProperty(id, this.props);
		}
	}
	shouldComponentUpdate(newProps, newState) {
		if (newProps.initialValues.action && newProps.initialValues.action.type === 'CREATE_PROPERTY') {
			newProps.history.push('/property/' + newProps.initialValues.action.id);
		}

		if (newProps.initialValues.id !== this.state.id) {
			delete newProps.initialValues.images;
			this.setState(newProps.initialValues);
		}
		return true;
	}
	enable = (e) => {
		let name = e.target.name;
		this.setState((prevState) => ({
			[name]: !prevState[name]
		}));
	};
	handleSelectChange = (e, name) => {
		if (this.state[name] !== e) {
			this.setState({ [name]: e });
			if (name === 'category') this.setState({ status: null, condition: null });
			if (name === 'city') this.setState({ district: null, street: null });
		} else {
		}
	};
	handleChange = (e) => {
		let name = e.target.id;
		let value = e.target.label;
		if (e.target.type === 'checkbox') {
			this.setState((prevState) => ({
				[name]: !prevState[name]
			}));
		} else {
			this.setState({ [name]: value });
		}
	};
	imageClick(e) {
		let id = e.target.getAttribute('data-index');
		this.setState((prevState) => {
			let res = prevState.images;
			res.splice(id, 1);
			for (let i = 0; i < res.length; i++) {
				res[i].id = i;
			}
			return {
				images: res
			};
		});
	}
	handleSubmit = (e) => {
		const id = this.props.match.params.property_id;
		let data = e;

		data.images = this.state.images;
		//console.log(this.state.images);

		if (this.state.lat !== null) {
			data.lat = this.state.lat;
			data.lng = this.state.lng;
		}
		if (!id) {
			if (this.props.auth.uid) {
				data.agentID = this.props.auth.uid;
				data.agencyID = this.props.profile.agency;
				data.verified = 1;
				data.active = 1;
			} else {
				data.active = 0;
				data.verified = 0;
			}

			this.props.createProperty(data, this.props);
		} else {
			this.props.editProperty(data, this.props);
		}
	};
	mapCoords = (e) => {
		this.setState({
			lat: e.lat,
			lng: e.lng
		});
	};
	handleSelectChange = (e, name) => {
		if (this.state[name] !== e) {
			this.setState({ [name]: e });
		}
	};
	render() {
		const { handleSubmit, pristine, submitting } = this.props;
		console.log(this.props);

		const guest = this.props.auth.uid ? false : true;
		const { initialValues } = this.props;
		//console.log(this.state);
		//console.log(this.props.auth.uid);

		const id = this.props.match.params.property_id;
		if (
			id &&
			Object.keys(this.props.initialValues).length === 0 //&&
			//this.props.initialValues.constructor === Object
		) {
			return <div>loading</div>;
		} // else if (id) console.log(this.props.initialValues);
		return (
			<div className="container CreateProperty">
				<h3 className="border-bottom text-center">განცხადების განთავსება</h3>
				<br />
				{guest ? (
					<div className="row">
						<div className="col-12">
							<PropertiesSlider
								onClick={(data) =>
									this.setState({
										agencies: { value: data.id, label: data.name },
										agencyID: data.id,
										agentID: data.owner
									})}
								additional={false}
								active={this.state.agencyID ? this.state.agencyID : null}
								type="agencies"
							/>
						</div>
						<div className="col-md-4 col-xl-3">
							<Field
								type="text"
								component={RequiredInput}
								placeholder="სახელი"
								name="owner"
								id="owner"
								style={{ width: '100%' }}
								className="css-o3h76h-control"
								validate={[ required ]}
								onChange={this.handleChange}
							/>
						</div>
						<div className="col-md-4 col-xl-3">
							<Field
								type="text"
								component={RequiredInput}
								placeholder="მობილურის ნომერი"
								name="ownerNum"
								id="ownerNum"
								style={{ width: '100%' }}
								className="css-o3h76h-control"
								validate={[ required ]}
								onChange={this.handleChange}
							/>
						</div>
						<div className="col-md-4 col-xl-6">
							<Field
								component={RenderSelectInput}
								id="agencies"
								name="agencies"
								async={true}
								placeholder="სააგენტოს არჩევა..."
								selected={this.state.agencies}
								validate={[ required ]}
								disabled={false}
								onChange={(v) => this.handleSelectChange(v, 'agencies')}
							/>
						</div>
					</div>
				) : (
					''
				)}
				<form onSubmit={handleSubmit(this.handleSubmit)}>
					<div className="row justify-content-center">
						<div className="col-md-6 col-xl-3">
							<label htmlFor="category">კატეგორია</label>
							<Field
								component={RenderSelectInput}
								options={categories}
								id="category"
								name="category"
								placeholder="არჩევა..."
								defaultValue={initialValues.category}
								validate={[ required ]}
								onChange={(v) => this.handleSelectChange(v, 'category')}
							/>
						</div>
						<div className="col-md-6 col-xl-3">
							<label htmlFor="contract">გარიგება</label>
							<Field
								component={RenderSelectInput}
								options={contracts}
								id="contract"
								name="contract"
								placeholder="არჩევა..."
								defaultValue={initialValues.contract}
								validate={[ required ]}
								onChange={(v) => this.handleSelectChange(v, 'contract')}
							/>
						</div>
						<div className="col-md-6 col-xl-3">
							<label htmlFor="status">სტატუსი</label>
							<Field
								component={RenderSelectInput}
								options={
									this.state.category !== null ? this.state.category.value !== 'land' ? (
										status
									) : (
										statusLand
									) : (
										[]
									)
								}
								selected={this.state.status}
								id="status"
								name="status"
								defaultValue={initialValues.status}
								placeholder="არჩევა..."
								validate={[ required ]}
								disabled={this.state.category === null}
								onChange={(v) => this.handleSelectChange(v, 'status')}
							/>
						</div>
						<div className="col-md-6 col-xl-3">
							<label htmlFor="condition">მდგომარეობა</label>
							<Field
								component={RenderSelectInput}
								options={conditions}
								id="condition"
								name="condition"
								placeholder="არჩევა..."
								defaultValue={initialValues.condition}
								disabled={this.state.status === null || this.state.category.value === 'land'}
								onChange={(v) => this.handleSelectChange(v, 'condition')}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-md-6 col-xl-3">
							<label htmlFor="city">ქალაქი</label>
							<Field
								component={RenderSelectInput}
								id="city"
								name="city"
								async={true}
								placeholder="არჩევა..."
								defaultValue={initialValues.city}
								validate={[ required ]}
								onChange={(v) => this.handleSelectChange(v, 'city')}
							/>
						</div>
						<div className="col-md-6 col-xl-3">
							<label htmlFor="district">უბანი</label>
							<Field
								component={RenderSelectInput}
								id="district"
								name="district"
								async={true}
								city={this.state.city}
								disabled={this.state.city}
								defaultValue={initialValues.district}
								placeholder="არჩევა..."
								validate={[ required ]}
								onChange={(v) => this.handleSelectChange(v, 'district')}
							/>
						</div>
						<div className="col-md-6 col-xl-3">
							<label htmlFor="street">ქუჩა</label>
							<Field
								component={RenderSelectInput}
								id="street"
								name="street"
								async={true}
								city={this.state.city}
								district={this.state.district}
								disabled={this.state.district}
								defaultValue={initialValues.street}
								placeholder="არჩევა..."
								onChange={(v) => this.handleSelectChange(v, 'street')}
							/>
						</div>
						<div className="col-md-6 col-xl-3">
							<label htmlFor="address">დაზუსტებული მის.</label>
							<Field
								className="css-o3h76h-control"
								type="text"
								component="input"
								placeholder="მისამართი"
								name="address"
								id="address"
								style={{ width: '100%' }}
								onChange={this.handleChange}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-xl-7 mx-auto" style={{ marginBottom: '20px' }}>
							<label htmlFor="cadastral">საკადასტრო კოდი</label>
							<Field
								className="css-o3h76h-control"
								type="text"
								component="input"
								placeholder="0.00.000.000"
								name="cadastral"
								id="cadastral"
								style={{ width: '100%' }}
								onChange={this.handleChange}
							/>
						</div>
						<div className="col-xl-7 mx-auto">
							<Gmaps
								location={{ lat: this.state.lat, lng: this.state.lng }}
								onClick={this.mapCoords}
								disabled={false}
							/>
						</div>
					</div>
					<div className="row justify-content-center">
						<div className="col-6 col-sm-4 col-md-3 col-xl-2">
							<Field
								type="text"
								component={RequiredInput}
								name="area"
								id="area"
								className="css-o3h76h-control"
								placeholder="ფართი"
								validate={[ required ]}
								onChange={this.handleChange}
							/>
						</div>
						<div
							className="col-6 col-sm-4 col-md-3 col-xl-2"
							style={{
								display:
									this.state.category === null
										? 'none'
										: this.state.category.value === 'house' ? 'block' : 'none'
							}}
						>
							<Field
								type="text"
								component={RequiredInput}
								name="yard"
								id="yard"
								className="css-o3h76h-control"
								placeholder="ეზო"
								onChange={this.handleChange}
							/>
						</div>
						<div
							className="col-6 col-sm-4 col-md-3 col-xl-2"
							style={{
								display:
									this.state.category === null
										? 'none'
										: this.state.category.value === 'land' ? 'none' : 'flex'
							}}
						>
							<Field
								className="css-o3h76h-control"
								type="text"
								component={RequiredInput}
								name="rooms"
								id="rooms"
								placeholder="ოთახი"
								onChange={this.handleChange}
							/>
						</div>
						<div
							className="col-6 col-sm-4 col-md-3 col-xl-2"
							style={{
								display:
									this.state.category === null
										? 'none'
										: this.state.category.value === 'land' ? 'none' : 'flex'
							}}
						>
							<Field
								className="css-o3h76h-control"
								type="text"
								component={RequiredInput}
								name="bedrooms"
								id="bedrooms"
								placeholder="საძინებელი"
								onChange={this.handleChange}
							/>
						</div>
						<div
							className="col-6 col-sm-4 col-md-3 col-xl-2"
							style={{
								display:
									this.state.category === null
										? 'none'
										: this.state.category.value === 'land' ? 'none' : 'flex'
							}}
						>
							<Field
								className="css-o3h76h-control"
								type="text"
								component={RequiredInput}
								name="bathrooms"
								id="bathrooms"
								placeholder="საპირფარეშო"
								onChange={this.handleChange}
							/>
						</div>
						<div
							className="col-6 col-sm-4 col-md-3 col-xl-2"
							style={{
								display:
									this.state.category === null
										? 'none'
										: this.state.category.value === 'land' ? 'none' : 'flex'
							}}
						>
							<div className="css-o3h76h-control">
								<Field
									type="text"
									component={RequiredInput}
									name="floor"
									id="floor"
									placeholder="სართული"
									onChange={this.handleChange}
									disabled={
										this.state.category === null ? (
											true
										) : this.state.category.value === 'land' ||
										this.state.category.value === 'house' ? (
											true
										) : (
											false
										)
									}
									style={{
										width: '100%',
										display: 'inline-block',
										height: '36px',
										borderRadius: '0px',
										border: 'none'
									}}
								/>
							</div>
							<div className="css-o3h76h-control" style={{ borderLeft: 'none' }}>
								<Field
									type="text"
									component={RequiredInput}
									name="floors"
									id="floors"
									placeholder="სულ სართ."
									onChange={this.handleChange}
									style={{
										width: '100%',
										display: 'inline-block',
										height: '36px',
										borderRadius: '0px',
										border: 'none',
										borderLeft: '1px solid hsl(0,0%,80%)'
									}}
								/>
							</div>
						</div>
						<div
							className="col-6 col-sm-4 col-md-3 col-xl-2"
							style={{
								display:
									this.state.category === null
										? 'none'
										: this.state.category.value === 'land' ? 'none' : 'flex'
							}}
						>
							<Field
								className="css-o3h76h-control"
								type="text"
								component={RequiredInput}
								placeholder="ჭერის სიმ."
								name="ceiling"
								onChange={this.handleChange}
							/>
						</div>
					</div>
					<div
						className="row justify-content-sm-center justify-content-between"
						style={{
							display:
								this.state.category === null
									? 'none'
									: this.state.category.value === 'land' ? 'none' : 'flex'
						}}
					>
						<div className="col-7 col-sm-4 col-md-4 col-xl-2">
							<div className="css-o3h76h-control" style={{ padding: '0 3px 0 3px' }}>
								<span style={{ color: '#a9a9a9' }}>აივანი</span>

								<div
									className="pretty p-icon p-curve p-smooth p-toggle"
									style={{ marginRight: '0', zIndex: '0' }}
								>
									<Field type="checkbox" component="input" name="eBalcony" onChange={this.enable} />
									<div className="state p-primary p-on">
										<i className="icon fa fa-check" />
										<label />
									</div>
									<div className="state p-danger p-off">
										<i className="icon fa fa-close" />
										<label />
									</div>
								</div>
								<Field
									type="checkbox"
									component={RequiredInput}
									type="text"
									name="balcony"
									disabled={!this.state.eBalcony}
									style={{ width: '65px', borderRadius: '0px', border: '1px solid hsl(0,0%,80%)' }}
									onChange={this.handleChange}
								/>
							</div>
						</div>
						<div className="col-7 col-sm-4 col-md-4 col-xl-2">
							<div className="css-o3h76h-control" style={{ padding: '0 3px 0 3px' }}>
								<span style={{ color: '#a9a9a9' }}>ვერანდა</span>
								<div
									className="pretty p-icon p-curve p-smooth p-toggle"
									style={{ marginRight: '0', zIndex: '0' }}
								>
									<Field type="checkbox" component="input" name="eVeranda" onChange={this.enable} />
									<div className="state p-primary p-on">
										<i className="icon fa fa-check" />
										<label />
									</div>
									<div className="state p-danger p-off">
										<i className="icon fa fa-close" />
										<label />
									</div>
								</div>
								<Field
									type="checkbox"
									component={RequiredInput}
									type="text"
									name="veranda"
									disabled={!this.state.eVeranda}
									style={{ width: '65px', borderRadius: '0px', border: '1px solid hsl(0,0%,80%)' }}
									onChange={this.handleChange}
								/>
							</div>
						</div>
						<div className="col-7 col-sm-4 col-md-4 col-xl-2">
							<div className="css-o3h76h-control" style={{ padding: '0 3px 0 3px' }}>
								<span style={{ color: '#a9a9a9' }}>ლოჯი</span>
								<div
									className="pretty p-icon p-curve p-smooth p-toggle"
									style={{ marginRight: '0', zIndex: '0' }}
								>
									<Field type="checkbox" component="input" name="eLoggia" onChange={this.enable} />
									<div className="state p-primary p-on">
										<i className="icon fa fa-check" />
										<label />
									</div>
									<div className="state p-danger p-off">
										<i className="icon fa fa-close" />
										<label />
									</div>
								</div>
								<Field
									type="checkbox"
									component={RequiredInput}
									type="text"
									name="loggia"
									disabled={!this.state.eLoggia}
									style={{ width: '65px', borderRadius: '0px', border: '1px solid hsl(0,0%,80%)' }}
									onChange={this.handleChange}
								/>
							</div>
						</div>
					</div>

					<div
						className="row justify-content-center"
						style={{
							display:
								this.state.category === null
									? 'none'
									: this.state.category.value === 'land' ? 'none' : 'flex'
						}}
					>
						<div className="col-md-6 col-xl-3">
							<label htmlFor="heating">გათბობა</label>
							<Field
								component={RenderSelectInput}
								options={heating}
								selected={this.state.heating}
								id="heating"
								defaultValue={initialValues.heating}
								name="heating"
								placeholder="არჩევა..."
								onChange={(v) => this.handleSelectChange(v, 'heating')}
							/>
						</div>
						<div className="col-md-6 col-xl-3">
							<label htmlFor="hotWater">წყლის გაცხელება</label>
							<Field
								component={RenderSelectInput}
								options={hotWater}
								selected={this.state.hotWater}
								defaultValue={initialValues.hotWater}
								id="hotWater"
								name="hotWater"
								placeholder="არჩევა..."
								onChange={(v) => this.handleSelectChange(v, 'hotWater')}
							/>
						</div>
						<div className="col-md-6 col-xl-3">
							<label htmlFor="parking">პარკინგი</label>
							<Field
								component={RenderSelectInput}
								options={parking}
								selected={this.state.parking}
								defaultValue={initialValues.parking}
								id="parking"
								name="parking"
								placeholder="არჩევა..."
								onChange={(v) => this.handleSelectChange(v, 'parking')}
							/>
						</div>
						<div className="col-md-6 col-xl-3">
							<label htmlFor="storeroom">სათავსო</label>
							<Field
								component={RenderSelectInput}
								options={storeroom}
								id="storeroom"
								selected={this.state.storeroom}
								defaultValue={initialValues.storeroom}
								name="storeroom"
								placeholder="არჩევა..."
								onChange={(v) => this.handleSelectChange(v, 'storeroom')}
							/>
						</div>
					</div>
					<div
						className="row justify-content-arround"
						style={{
							display:
								this.state.category === null
									? 'none'
									: this.state.category.value === 'land' ? 'none' : 'flex'
						}}
					>
						<div className="col-6 col-sm-6 col-md-4 col-xl-3">
							<div
								className="pretty p-icon p-curve p-smooth p-toggle"
								style={{ marginRight: '0', zIndex: '0' }}
							>
								<Field
									type="checkbox"
									component="input"
									id="conditioner"
									name="conditioner"
									onChange={this.handleChange}
								/>
								<div className="state p-primary p-on">
									<i className="icon fa fa-check" />
									<label>კონდიციონერი</label>
								</div>
								<div className="state p-danger p-off">
									<i className="icon fa fa-close" />
									<label>კონდიციონერი</label>
								</div>
							</div>
						</div>
						<div className="col-6 col-sm-6 col-md-4 col-xl-3">
							<div
								className="pretty p-icon p-curve p-smooth p-toggle"
								style={{ marginRight: '0', zIndex: '0' }}
							>
								<Field
									type="checkbox"
									component="input"
									id="elevator"
									name="elevator"
									onChange={this.handleChange}
								/>
								<div className="state p-primary p-on">
									<i className="icon fa fa-check" />
									<label>ლიფტი</label>
								</div>
								<div className="state p-danger p-off">
									<i className="icon fa fa-close" />
									<label>ლიფტი</label>
								</div>
							</div>
						</div>
						<div className="col-6 col-sm-6 col-md-4 col-xl-3">
							<div
								className="pretty p-icon p-curve p-smooth p-toggle"
								style={{ marginRight: '0', zIndex: '0' }}
							>
								<Field
									type="checkbox"
									component="input"
									id="television"
									name="television"
									onChange={this.handleChange}
								/>
								<div className="state p-primary p-on">
									<i className="icon fa fa-check" />
									<label>ტელევიზია</label>
								</div>
								<div className="state p-danger p-off">
									<i className="icon fa fa-close" />
									<label>ტელევიზია</label>
								</div>
							</div>
						</div>
						<div className="col-6 col-sm-6 col-md-4 col-xl-3">
							<div
								className="pretty p-icon p-curve p-smooth p-toggle"
								style={{ marginRight: '0', zIndex: '0' }}
							>
								<Field
									type="checkbox"
									component="input"
									id="telephone"
									name="telephone"
									onChange={this.handleChange}
								/>
								<div className="state p-primary p-on">
									<i className="icon fa fa-check" />
									<label>ტელეფონი</label>
								</div>
								<div className="state p-danger p-off">
									<i className="icon fa fa-close" />
									<label>ტელეფონი</label>
								</div>
							</div>
						</div>
						<div className="col-6 col-sm-6 col-md-4 col-xl-3">
							<div
								className="pretty p-icon p-curve p-smooth p-toggle"
								style={{ marginRight: '0', zIndex: '0' }}
							>
								<Field
									type="checkbox"
									component="input"
									id="internet"
									name="internet"
									onChange={this.handleChange}
								/>
								<div className="state p-primary p-on">
									<i className="icon fa fa-check" />
									<label>ინტერნეტი</label>
								</div>
								<div className="state p-danger p-off">
									<i className="icon fa fa-close" />
									<label>ინტერნეტი</label>
								</div>
							</div>
						</div>
						<div className="col-6 col-sm-6 col-md-4 col-xl-3">
							<div
								className="pretty p-icon p-curve p-smooth p-toggle"
								style={{ marginRight: '0', zIndex: '0' }}
							>
								<Field
									type="checkbox"
									component="input"
									id="fireplace"
									name="fireplace"
									onChange={this.handleChange}
								/>
								<div className="state p-primary p-on">
									<i className="icon fa fa-check" />
									<label>ბუხარი</label>
								</div>
								<div className="state p-danger p-off">
									<i className="icon fa fa-close" />
									<label>ბუხარი</label>
								</div>
							</div>
						</div>
						<div className="col-6 col-sm-6 col-md-4 col-xl-3">
							<div
								className="pretty p-icon p-curve p-smooth p-toggle"
								style={{ marginRight: '0', zIndex: '0' }}
							>
								<Field
									type="checkbox"
									component="input"
									id="furniture"
									name="furniture"
									onChange={this.handleChange}
								/>
								<div className="state p-primary p-on">
									<i className="icon fa fa-check" />
									<label>ავეჯი</label>
								</div>
								<div className="state p-danger p-off">
									<i className="icon fa fa-close" />
									<label>ავეჯი</label>
								</div>
							</div>
						</div>
						<div className="col-6 col-sm-6 col-md-4 col-xl-3">
							<div
								className="pretty p-icon p-curve p-smooth p-toggle"
								style={{ marginRight: '0', zIndex: '0' }}
							>
								<Field
									type="checkbox"
									component="input"
									id="electronics"
									name="electronics"
									onChange={this.handleChange}
								/>
								<div className="state p-primary p-on">
									<i className="icon fa fa-check" />
									<label>ტექნიკა</label>
								</div>
								<div className="state p-danger p-off">
									<i className="icon fa fa-close" />
									<label>ტექნიკა</label>
								</div>
							</div>
						</div>
					</div>
					<div className="row justify-content-center">
						<div className="col-xl-4">
							ქართული
							<Field name="textGe" id="textGe" component="textarea" />
						</div>
						<div className="col-xl-4">
							ინგლისური
							<Field name="textEn" id="textEn" component="textarea" />
						</div>
						<div className="col-xl-4">
							რუსული
							<Field name="textRu" id="textRu" component="textarea" />
						</div>
					</div>

					<div className="row">
						<div className="col-md-3">
							<Dropzone
								accept="image/*"
								maxSize={52428800}
								multiple
								onDrop={(acceptedFiles) => {
									const files = acceptedFiles;
									files.forEach((file) => {
										const reader = new FileReader();
										reader.addEventListener(
											'load',
											() => {
												this.setState((prevState) => {
													let k = prevState.images;
													k.push({ id: k.length, src: reader.result });
													return {
														images: k
													};
												});
											},
											false
										);
										reader.readAsDataURL(file);
									});
								}}
							>
								{({ getRootProps, getInputProps }) => (
									<section>
										<div
											{...getRootProps()}
											className="dropZone"
											style={{
												textAlign: 'center',
												height: '120px',
												width: '100%',
												background: '#ddd',
												border: '3px dashed #83ae3e'
											}}
										>
											<input {...getInputProps()} />
											<p style={{ paddingTop: '40px' }}>სურათების ატვირთვა</p>
										</div>
									</section>
								)}
							</Dropzone>
						</div>
						{this.state.images.length ? (
							this.state.images.map((image) => (
								<div className="col-3 col-sm-3 col-md-3">
									<img
										onClick={(e) => this.imageClick(e)}
										src={image.src}
										key={image.id}
										data-index={image.id}
										style={{ height: '120px', padding: '0 auto' }}
									/>
									{image.id === 0 && 'MAIN'}
								</div>
							))
						) : (
							''
						)}
					</div>
					<div className="row justify-content-center">
						<div className="col-sm-4 col-md-3 col-xl-2">
							<Field
								component={RequiredInput}
								type="text"
								name="price"
								placeholder="ფასი"
								className="css-o3h76h-control"
								onChange={this.handleChange}
								validate={[ required ]}
							/>
						</div>
						<div className="col-sm-4 col-md-3 col-xl-2" style={{ width: '50px' }}>
							<Field
								component={RenderSelectInput}
								id="currency"
								name="currency"
								//selected={this.state.currency}
								options={currencies}
								defaultValue={this.state.currency}
								onChange={(v) => this.handleSelectChange(v, 'currency')}
							/>
						</div>
					</div>
					<div className="row justify-content-center" style={{ marginTop: '10px' }}>
						<button
							className="btn btn-primary"
							//disabled={pristine || submitting}
							onClick={() => animateScrollTo(0)}
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadProperty: (id, ownProps) => {
			dispatch(loadProperty(id, ownProps));
		},
		createProperty: (property, ownProps) => {
			dispatch(createProperty(property, ownProps));
		},
		editProperty: (property, ownProps) => {
			dispatch(editProperty(property, ownProps));
		}
	};
};
const mapStateToProps = (state, ownProps) => {
	return {
		//property: state.properties.action,
		auth: state.firebase.auth,
		profile: state.firebase.profile,
		initialValues: state.properties
		//form: ownProps.match.url
	};
};
//const enhance = compose(withFirestore, connect(mapStateToProps, mapDispatchToProps));

export default compose(withFirestore, connect(mapStateToProps, mapDispatchToProps))(
	reduxForm({
		form: 'edit',
		enableReinitialize: true
	})(CreateProperty)
);
