import React, { Component } from 'react';
import Select from 'react-select';
import './Filter.scss';
import RenderSelectInput from '../Components/RenderSelectInput';
import { Field, reduxForm, reset } from 'redux-form';
import RequiredInput from '../Components/RequiredInput';
import { connect } from 'react-redux';
import { compose } from 'redux';
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
	{ value: 'USD', label: '$' },
	{ value: 'EUR', label: '€' },
	{ value: 'RUB', label: '₽' }
];
export class Filter extends Component {
	state = {
		additional: true,
		district: true,
		street: true,
		area: true,
		price: true,

		conditioner: false,
		elevator: false,
		television: false,
		telephone: false,
		internet: false,
		fireplace: false,
		furniture: false,
		electronics: false,

		category: { value: 'apartment', label: 'ბინა' },
		contract: undefined,

		status: undefined,
		condition: undefined,

		city: undefined,
		district: undefined,
		street: undefined,
		address: null,
		cadastral: null,

		area: null,
		rooms: null,
		bedrooms: null,
		bathrooms: null,
		floor: null,
		floors: null,

		balcony: null,
		veranda: null,
		loggia: null,

		heating: { value: false, label: 'არა' },
		hotWater: { value: false, label: 'არა' },
		parking: { value: false, label: 'არა' },
		storeroom: { value: false, label: 'არა' },

		currency: { value: 'lari', label: '₾' },

		minArea: null,
		maxArea: null,
		minPrice: null,
		maxPrice: null
	};

	closeModals() {
		this.setState({
			area: true,
			price: true
		});
	}

	showArea() {
		this.setState((prev) => {
			return {
				area: !prev.area,
				price: true
			};
		});
	}
	showPrice() {
		this.setState((prev) => {
			return {
				price: !prev.price,
				area: true
			};
		});
	}
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
		let value = e.target.value;
		if (e.target.type === 'checkbox') {
			this.setState((prevState) => ({
				[name]: !prevState[name]
			}));
		} else {
			this.setState({ [name]: value });
		}
	};
	// displayArea() {
	// 	if (this.state.minArea === null && this.state.maxArea == null) {
	// 		area = 'ფართი';
	// 	} else {
	// 		area = 'ფართი: ';
	// 		let marea = '';
	// 		if (this.state.minArea !== null) {
	// 			area = area + this.state.minArea;
	// 		}
	// 		if (this.state.maxArea !== null) {
	// 			marea = this.state.minArea;
	// 		}
	// 		if (this.state.minArea !== null && this.state.maxArea !== null) {
	// 			area = area + ' - ';
	// 		}
	// 		area = area + marea;
	// 	}
	// 	this.showArea();
	// }
	componentWillReceiveProps(props) {
		if (props.selected) {
			console.log(props.selected);
			this.setState(props.selected);
		}
		// 	for (var k in selected) {
		// 		//console.log(k);
		// 		//this.setState({ [k]: selected[k] });
		// 	}
		// }
	}
	clearFilter() {
		this.setState({
			contract: null,
			city: null,
			district: null,
			street: null
		});
	}
	render() {
		const { handleSubmit, selected, reset } = this.props;
		//console.log(this.props.loc, this.state.category);
		//console.log(this.state);

		return (
			<div className="filter-body">
				<form onSubmit={handleSubmit}>
					<div className="row justify-content-center" style={{ margin: '0' }}>
						<div className="col-md-4 col-lg-3 col-xl-1">
							<Field
								component={RenderSelectInput}
								options={categories}
								id="category"
								name="category"
								selected={this.state.category}
								placeholder="არჩევა..."
								onChange={(v) => this.handleSelectChange(v, 'category')}
							/>
						</div>
						<div className="col-md-4 col-lg-3 col-xl-2">
							<Field
								component={RenderSelectInput}
								options={contracts}
								id="contract"
								name="contract"
								selected={this.state.contract}
								placeholder="არჩევა..."
								onChange={(v) => this.handleSelectChange(v, 'contract')}
							/>
						</div>
						<div className="col-md-4 col-lg-4 col-xl-1">
							<Field
								component={RenderSelectInput}
								id="city"
								name="city"
								selected={this.state.city}
								async={true}
								placeholder="არჩევა..."
								onChange={(v) => this.handleSelectChange(v, 'city')}
							/>
						</div>
						<div className="col-md-6 col-lg-4 col-xl-2">
							<Field
								component={RenderSelectInput}
								id="district"
								name="district"
								multi={true}
								async={true}
								city={this.state.city}
								selected={this.state.district}
								disabled={this.state.city}
								placeholder="არჩევა..."
								onChange={(v) => this.handleSelectChange(v, 'district')}
							/>
						</div>
						<div className="col-md-6 col-lg-4 col-xl-2">
							<Field
								component={RenderSelectInput}
								id="street"
								name="street"
								async={true}
								multi={true}
								city={this.state.city}
								district={this.state.district}
								selected={this.state.street}
								disabled={this.state.district}
								placeholder="არჩევა..."
								onChange={(v) => this.handleSelectChange(v, 'street')}
							/>
						</div>

						<div className="col-md-6 col-lg-5 col-xl-2">
							<div className="area-body">
								<div
									id="area"
									className="css-o3h76h-control"
									style={{
										color: 'hsl(0,0%,50%)'
									}}
									onClick={this.showArea}
								>
									<div style={{ textAlign: 'right' }}>
										<span style={{ float: 'left', marginTop: '7px' }}>ფართი</span>

										<Field
											component="input"
											type="text"
											name="areaMin"
											placeholder="min"
											style={{
												width: '30%',

												height: '36px',
												borderRadius: '0px',
												border: 'none',
												borderLeft: '1px solid hsl(0,0%,80%)'
											}}
										/>
										<Field
											component="input"
											type="text"
											name="areaMax"
											placeholder="max"
											style={{
												width: '30%',
												height: '36px',
												borderRadius: '0px',
												border: 'none',
												borderLeft: '1px solid hsl(0,0%,80%)'
											}}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-6 col-lg-5 col-xl-2">
							<div className="price-body">
								<div
									id="price"
									className="css-o3h76h-control"
									style={{
										color: 'hsl(0,0%,50%)',
										border: !this.state.price && '1px solid #fc8816',
										boxShadow: !this.state.price && '0px 0px 0px 1px #fc8816'
									}}
									onClick={this.showPrice}
								>
									<div style={{ textAlign: 'right' }}>
										<span style={{ float: 'left', marginTop: '7px' }}>ფასი</span>

										<Field
											component="input"
											type="text"
											name="priceMin"
											placeholder="min"
											style={{
												width: '30%',
												height: '36px',
												borderRadius: '0px',
												border: 'none',
												borderLeft: '1px solid hsl(0,0%,80%)'
											}}
										/>
										<Field
											component="input"
											type="text"
											name="priceMax"
											placeholder="max"
											style={{
												width: '30%',
												height: '36px',
												borderRadius: '0px',
												border: 'none',
												borderLeft: '1px solid hsl(0,0%,80%)'
											}}
										/>
									</div>
								</div>
							</div>
						</div>
						{/* <div className="location">

					<button onClick={this.show}>SSS</button>
				</div> */}
					</div>

					<div className="filter-additional" style={{ display: this.state.additional ? 'none' : 'block' }}>
						{/* <input className="css-o3h76h-control" type="text" name="text" id="text" placeholder="საძიებო სიტყვა/ID" /> */}
						<div className="filter-additional-top">
							{/* <select id="status">
						<option defaultValue="">სტატუსი</option>
					</select> */}
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
								placeholder="არჩევა..."
								disabled={this.state.category === null}
								onChange={(v) => this.handleSelectChange(v, 'status')}
							/>

							{/* <select id="condition">
						<option defaultValue="">მდგომარეობა</option>
					</select> */}
							<Field
								component={RenderSelectInput}
								options={conditions}
								id="condition"
								name="condition"
								placeholder="არჩევა..."
								selected={this.state.condition}
								disabled={this.state.status === null || this.state.category.value === 'land'}
								onChange={(v) => this.handleSelectChange(v, 'condition')}
							/>

							{/* <select id="heating">
						<option defaultValue="">გათბობა</option>
					</select> */}
							<Field
								component={RenderSelectInput}
								options={heating}
								selected={this.state.heating}
								id="heating"
								name="heating"
								placeholder="არჩევა..."
								onChange={(v) => this.handleSelectChange(v, 'heating')}
							/>
							{/* <select id="hotWater">
						<option defaultValue="">წყლ. გათბობა</option>
					</select> */}
							<Field
								component={RenderSelectInput}
								options={hotWater}
								selected={this.state.hotWater}
								id="hotWater"
								name="hotWater"
								placeholder="არჩევა..."
								onChange={(v) => this.handleSelectChange(v, 'hotWater')}
							/>

							<Field
								component={RenderSelectInput}
								options={parking}
								selected={this.state.parking}
								id="parking"
								name="parking"
								placeholder="არჩევა..."
								onChange={(v) => this.handleSelectChange(v, 'parking')}
							/>

							<Field
								component={RenderSelectInput}
								options={storeroom}
								id="storeroom"
								selected={this.state.storeroom}
								name="storeroom"
								placeholder="არჩევა..."
								onChange={(v) => this.handleSelectChange(v, 'storeroom')}
							/>
						</div>
						{/* 						
						<div
							style={{
								display: 'flex',
								flexWrap: 'wrap',
								alignItems: 'center',
								justifyContent: 'center'
							}}
						>
							<div
								className="rooms"
								style={{
									display: 'flex',
									flexWrap: 'wrap',
									alignItems: 'center',
									justifyContent: 'center'
								}}
							>
								<div>
									<label htmlFor="room">ოთახი</label>
									<input
										className="css-o3h76h-control"
										type="text"
										id=""
										defaultValue=""
										placeholder="მინ"
										name="room"
									/>
								</div>
								<div>
									<label htmlFor="bedroom">საძინებელი</label>
									<input
										className="css-o3h76h-control"
										type="text"
										id=""
										defaultValue=""
										placeholder="მინ"
										name="bedroom"
									/>
								</div>
								<div>
									<label htmlFor="bathroom">საპირფარეშო</label>
									<input
										className="css-o3h76h-control"
										type="text"
										id=""
										defaultValue=""
										placeholder="მინ"
										name="bathroom"
									/>
								</div>
							</div>

							<div className="Floors">
								<div className="floor">
									<label htmlFor="minFloor">სართული</label>
									<input
										className="css-o3h76h-control"
										type="text"
										id=""
										defaultValue=""
										placeholder="მინ"
										name="minFloor"
									/>
									{' - '}
									<input
										className="css-o3h76h-control"
										type="text"
										id=""
										defaultValue=""
										placeholder="მაქს"
										name="maxFloor"
									/>
								</div>
								<div className="floors">
									<label htmlFor="minFloors">სართულიანი</label>
									<input
										className="css-o3h76h-control"
										type="text"
										id=""
										defaultValue=""
										placeholder="მინ"
										name="minFloors"
									/>
									{' - '}
									<input
										className="css-o3h76h-control"
										type="text"
										id=""
										defaultValue=""
										placeholder="მაქს"
										name="maxFloors"
									/>
								</div>
							</div>
						</div>
						 */}
						<div className="balcony">
							<div>
								<label htmlFor="pirveli">არა პირველი</label>
								<input type="checkbox" name="bal" id="pirveli" className="styled-checkbox" />
							</div>
							<div>
								<label htmlFor="bolo">არა ბოლო</label>
								<input type="checkbox" name="bal" id="bolo" className="styled-checkbox" />
							</div>
							<div>
								<label htmlFor="balcony">აივანი</label>
								<input type="checkbox" name="bal" id="balcony" className="styled-checkbox" />
							</div>
							<div>
								<label htmlFor="veranda">ვერანდა</label>
								<input type="checkbox" name="bal" id="veranda" />
							</div>
							<div>
								<label htmlFor="loggia">ლოჯია</label>
								<input type="checkbox" name="bal" id="loggia" />
							</div>
						</div>
					</div>
					<div className="filter-btn">
						<button
							className="btn btn-primary"
							style={{
								boxShadow: '2px 2px 5px rgba(200, 200, 200, 1'
							}}
						>
							ძებნა
						</button>
						<button
							className="btn btn-secondary"
							onClick={() => {
								this.clearFilter();
								reset();
							}}
						>
							გასუფთავება
						</button>
						{/* <span
							className="addFilter"
							onClick={() =>
								this.setState((prev) => {
									return {
										additional: !prev.additional
									};
								})}
						>
							<i className={'icon-sushi fas ' + (this.state.additional ? 'fa-plus' : 'fa-minus')} /> დეტ.
							ძებნა
						</span> */}
					</div>
				</form>
			</div>
		);
	}
}

export default reduxForm({
	form: 'filter'
})(Filter);
