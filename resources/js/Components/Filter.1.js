import React, { Component } from 'react';
import Select from 'react-select';
import './Filter.scss';
const categories = [
	{ value: 'apartment', label: 'ბინა', id: 1 },
	{ value: 'house', label: 'სახლი', id: 2 },
	{ value: 'commercial', label: 'კომერციული ფართი', id: 3 },
	{ value: 'hotel', label: 'სასტუმრო', id: 4 },
	{ value: 'land', label: 'მიწის ნაკვეთი', id: 5 }
];
const contracts = [
	{ value: 'sell', label: 'იყიდება', id: 1 },
	{ value: 'rentM', label: 'ქირავდება', id: 2 },
	{ value: 'rentD', label: 'დღიურად', id: 3 },
	{ value: 'сollateral', label: 'გირავდება', id: 4 }
];
const cities = [
	{ value: 'tbilisi', label: 'თბილისი', id: 1 },
	{ value: 'batumi', label: 'ბათუმი', id: 2 },
	{ value: 'qutaisi', label: 'ქუთაისი', id: 3 }
];
const districts = {
	tbilisi: [
		{ value: 'saburtalo', label: 'საბურთალო', id: 1 },
		{ value: 'vake', label: 'ვაკე', id: 2 },
		{ value: 'didube', label: 'დიღომი', id: 3 }
	],
	batumi: [
		{ value: 'zgvastan', label: 'ზღვასთან' },
		{ value: 'qalaqshi', label: 'ცენტრში' },
		{ value: 'sxvagan', label: 'შემოგარენი' }
	]
};
const streets = {
	saburtalo: [
		{ value: 'saburtalo1', label: 'პეკინის გამზ.', id: 1 },
		{ value: 'saburtalo2', label: 'დოლიძის ქ.', id: 2 },
		{ value: 'saburtalo3', label: 'უნივერსიტეტის ქ.', id: 3 }
	],
	vake: [
		{ value: 'vake1', label: 'ჭავჭავაძის გამზ.' },
		{ value: 'vake2', label: 'ფალიაშვილის ქ.' },
		{ value: 'vake3', label: 'ტაბიძის ქ.' }
	]
};
const status = [
	{ value: 'ახალ აშენებული', label: 'ახალ აშენებული' },
	{ value: 'ძველი აშენებული', label: 'ძველი აშენებული' },
	{ value: 'მშენებარე', label: 'მშენებარე' }
];
const condition = [
	{ value: 'ახალი გარემონტებული', label: 'ახალი გარემონტებული' },
	{ value: 'ძველი გარემონტებული', label: 'ძველი გარემონტებული' },
	{ value: 'სარემონტო', label: 'სარემონტო' },
	{ value: 'მიმდინარე რემონტი', label: 'მიმდინარე რემონტი' },
	{ value: 'მწვანე კარკასი', label: 'მწვანე კარკასი' },
	{ value: 'თეთრი კარკასი', label: 'თეთრი კარკასი' },
	{ value: 'შავი კარკასი', label: 'შავი კარკასი' }
];
const heating = [
	{ value: 'ცენტრალური', label: 'ცენტრალური' },
	{ value: 'გაზის', label: 'გაზის' },
	{ value: 'დენის', label: 'დენის' },
	{ value: 'იატაკის', label: 'იატაკის' }
];
const hotWater = [
	{ value: 'ცენტრალური', label: 'ცენტრალური' },
	{ value: 'გაზის', label: 'გაზის' },
	{ value: 'დენის', label: 'დენის' },
	{ value: 'ბუნებრივი', label: 'ბუნებრივი' }
];
const storeroom = [
	{ value: 'სარდაფი', label: 'სარდაფი' },
	{ value: 'სხვენი', label: 'სხვენი' },
	{ value: 'საკუჭნაო', label: 'საკუჭნაო' },
	{ value: 'გარე სათავსო', label: 'გარე სათავსო' },
	{ value: 'საერთო სათავსო', label: 'საერთო სათავსო' },
	{ value: 'სხვა', label: 'სხვა' }
];
const parking = [
	{ value: 'ავტოფარეხი', label: 'ავტოფარეხი' },
	{ value: 'კორპუსის პარკინგი', label: 'კორპუსის პარკინგი' },
	{ value: 'საერთო პარკინგი', label: 'საერთო პარკინგი' }
];

var activeDistricts = [];
var activeStreets = [];
var area = 'ფართი';
export class Filter extends Component {
	constructor() {
		super();
		this.state = {
			additional: true,
			district: true,
			street: true,
			area: true,
			price: true,
			selectedCategory: null,
			selectedContract: null,
			selectedCity: null,
			selectedDistricts: null,
			selectedStreets: null,
			selectedArea: null,
			selectedPrice: null,
			selectedWord: null,

			selectedStatus: null,
			selectedCondition: null,
			selectedHeating: null,
			selectedHotWater: null,
			selectedStoreroom: null,
			selectedParking: null,

			minArea: null,
			maxArea: null,
			minPrice: null,
			maxPrice: null
		};
		this.handleCityChange = this.handleCityChange.bind(this);
		this.handleDistrictChange = this.handleDistrictChange.bind(this);
		this.handleStreetChange = this.handleStreetChange.bind(this);
		this.handleCategoryChange = this.handleCategoryChange.bind(this);
		this.handleContractChange = this.handleContractChange.bind(this);
		this.handleStatus = this.handleStatus.bind(this);
		this.handleCondition = this.handleCondition.bind(this);
		this.handleHeating = this.handleHeating.bind(this);

		this.handleHotWater = this.handleHotWater.bind(this);
		this.handleStoreroom = this.handleStoreroom.bind(this);
		this.handleParking = this.handleParking.bind(this);

		this.showArea = this.showArea.bind(this);
		this.showPrice = this.showPrice.bind(this);
		this.showAdditional = this.showAdditional.bind(this);
		this.closeModals = this.closeModals.bind(this);
		this.displayArea = this.displayArea.bind(this);
	}
	closeModals() {
		this.setState({
			area: true,
			price: true
		});
	}
	handleCategoryChange = (selectedCategory) => {
		this.setState({ selectedCategory: selectedCategory });
	};
	handleContractChange = (selectedContract) => {
		this.setState({ selectedContract: selectedContract });
	};

	handleCityChange = (selectedCity) => {
		if (selectedCity.id === 1) {
			activeDistricts = districts.tbilisi;
			this.setState({ district: false });
		} else if (selectedCity.id === 2) {
			activeDistricts = districts.batumi;
			this.setState({ district: false });
		} else {
			activeDistricts = [];
			this.setState({ district: true });
		}
		if (this.state.selectedCity !== selectedCity) {
			this.setState({ selectedDistricts: null, selectedStreets: null });
		}
		this.setState({ selectedCity: selectedCity });
	};

	handleDistrictChange = (selectedDistricts) => {
		activeStreets = [];
		if (selectedDistricts.length < 1) {
			this.setState({ street: true, selectedDistricts: null });
		} else {
			for (let i = 0; i < selectedDistricts.length; i++) {
				if (selectedDistricts[i].id === 1) {
					activeStreets = activeStreets.concat(streets.saburtalo);
				} else if (selectedDistricts[i].id === 2) {
					activeStreets = activeStreets.concat(streets.vake);
				}
			}
			this.setState({ street: false, selectedDistricts: selectedDistricts });
		}
	};

	handleStreetChange = (selectedStreets) => {
		this.setState({ selectedStreets: selectedStreets });
	};

	handleStatus(selectedStatus) {
		this.setState({ selectedStatus: selectedStatus });
	}
	handleCondition(selectedCondition) {
		this.setState({ selectedCondition: selectedCondition });
	}
	handleHeating(selectedHeating) {
		this.setState({ selectedHeating: selectedHeating });
	}
	handleHotWater(selectedHotWater) {
		this.setState({ selectedHotWater: selectedHotWater });
	}
	handleStoreroom(selectedStoreroom) {
		this.setState({ selectedStoreroom: selectedStoreroom });
	}
	handleParking(selectedParking) {
		this.setState({ selectedParking: selectedParking });
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

	showAdditional() {
		this.setState((prev) => {
			return {
				additional: !prev.additional
			};
		});
	}
	displayArea() {
		if (this.state.minArea === null && this.state.maxArea == null) {
			area = 'ფართი';
		} else {
			area = 'ფართი: ';
			let marea = '';
			if (this.state.minArea !== null) {
				area = area + this.state.minArea;
			}
			if (this.state.maxArea !== null) {
				marea = this.state.minArea;
			}
			if (this.state.minArea !== null && this.state.maxArea !== null) {
				area = area + ' - ';
			}
			area = area + marea;
		}
		this.showArea();
	}
	render() {
		const {
			selectedCategory,
			selectedContract,
			selectedCity,
			selectedDistricts,
			selectedStreets,
			selectedStatus,
			selectedCondition,
			selectedHeating,
			selectedHotWater,
			selectedStoreroom,
			selectedParking
		} = this.state;

		return (
			<div className="filter-body">
				<div className="text-center mb-3">
					<h1>იპოვე, შენი სახლი!</h1>
				</div>
				<div className="filter-main">
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
						className="category"
						placeholder="კატეგორია"
						name="dd"
						value={selectedCategory}
						onChange={this.handleCategoryChange}
						options={categories}
						inputProps={{ readOnly: true }}
						isSearchable={!(this.props.screenWidth <= 576)}
					/>

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
						name="ddas"
						className="contract"
						placeholder="გარიგება"
						value={selectedContract}
						onChange={this.handleContractChange}
						options={contracts}
						inputProps={{ readOnly: true }}
						isSearchable={!(this.props.screenWidth <= 576)}
					/>
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
						name="ddsad"
						className="city"
						placeholder="ქალაქი"
						value={selectedCity}
						onChange={this.handleCityChange}
						options={cities}
						inputProps={{ readOnly: true }}
						isSearchable={!(this.props.screenWidth <= 576)}
					/>

					<Select
						isMulti
						theme={(theme) => ({
							...theme,
							borderRadius: 0,
							colors: {
								...theme.colors,
								primary25: 'rgba(252, 136, 22, 0.25)',
								primary: 'rgba(252, 136, 22, 1)'
							}
						})}
						name="dasda"
						className="district"
						placeholder="უბანი"
						value={selectedDistricts}
						isDisabled={this.state.district}
						onChange={this.handleDistrictChange}
						options={activeDistricts}
						inputProps={{ readOnly: true }}
						isSearchable={!(this.props.screenWidth <= 576)}
					/>

					<Select
						isMulti
						theme={(theme) => ({
							...theme,
							borderRadius: 0,
							colors: {
								...theme.colors,
								primary25: 'rgba(252, 136, 22, 0.25)',
								primary: 'rgba(252, 136, 22, 1)'
							}
						})}
						name="d21asd"
						className="street"
						placeholder="ქუჩა"
						value={selectedStreets}
						isDisabled={this.state.street}
						onChange={this.handleStreetChange}
						options={activeStreets}
						inputProps={{ readOnly: true }}
						isSearchable={!(this.props.screenWidth <= 576)}
					/>

					<div className="area-body">
						<div
							id="area"
							className="css-o3h76h-control"
							style={{
								color: 'hsl(0,0%,50%)',
								border: !this.state.area && '1px solid #fc8816',
								boxShadow: !this.state.area && '0px 0px 0px 1px #fc8816'
							}}
							onClick={this.showArea}
						>
							{area}
						</div>
						<div
							className="showIns"
							style={{ textAlign: 'center', display: this.state.area ? 'none' : 'block' }}
						>
							<input
								className="css-o3h76h-control"
								type="text"
								placeholder="Min"
								name="min-area"
								id="min-area"
								value={this.state.minArea}
								onChange={(e) => {
									this.setState({ minArea: e.target.value });
								}}
							/>
							<input
								className="css-o3h76h-control"
								type="text"
								placeholder="Max"
								name="max-area"
								id="max-area"
								value={this.state.maxArea}
								onChange={(e) => {
									this.setState({ maxArea: e.target.value });
								}}
							/>

							<button className="btn btn-primary" onClick={this.displayArea}>
								შენახვა
							</button>
							<button
								className="btn btn-secondary"
								onClick={() => {
									this.setState({ minArea: null, maxArea: null });
									area = 'ფართი';
								}}
							>
								გასუფთავება
							</button>
						</div>
					</div>

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
							ფასი
						</div>
						<div
							className="showIns"
							style={{
								textAlign: 'center',
								display: this.state.price ? 'none' : 'block'
							}}
						>
							<div>
								<label htmlFor="total">Total</label>
								<input
									checked="checked"
									type="radio"
									id="total"
									name="priceType"
									value="total"
									style={{ display: 'inline', margin: '0 10px 0 5px' }}
								/>

								<label htmlFor="squere">Squere</label>
								<input
									type="radio"
									id="squere"
									name="priceType"
									value="squere"
									style={{ display: 'inline', margin: '0 10px 0 5px' }}
								/>

								<select name="" id="" style={{ width: '50px', border: 'none' }}>
									<option value="">₾</option>
									<option value="">$</option>
									<option value="">€</option>
									<option value="">₽</option>
								</select>
							</div>

							<input
								className="css-o3h76h-control"
								type="text"
								placeholder="Min"
								name="min-price"
								id="min-price"
							/>
							<input
								className="css-o3h76h-control"
								type="text"
								placeholder="Max"
								name="max-price"
								id="max-price"
							/>

							<button className="btn btn-primary" onClick={this.showPrice}>
								შენახვა
							</button>
							<button className="btn btn-secondary">გასუფთავება</button>
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
						<Select
							isMulti
							theme={(theme) => ({
								...theme,
								borderRadius: 0,
								colors: {
									...theme.colors,
									primary25: 'rgba(252, 136, 22, 0.25)',
									primary: 'rgba(252, 136, 22, 1)'
								}
							})}
							name="ddasd12"
							className="status"
							placeholder="სტატუსი"
							value={selectedStatus}
							onChange={this.handleStatus}
							options={status}
							inputProps={{ readOnly: true }}
							isSearchable={!(this.props.screenWidth <= 576)}
						/>

						{/* <select id="condition">
						<option defaultValue="">მდგომარეობა</option>
					</select> */}
						<Select
							isMulti
							theme={(theme) => ({
								...theme,
								borderRadius: 0,
								colors: {
									...theme.colors,
									primary25: 'rgba(252, 136, 22, 0.25)',
									primary: 'rgba(252, 136, 22, 1)'
								}
							})}
							name="ddasd12"
							className="condition"
							placeholder="მდგომარეობა"
							value={selectedCondition}
							onChange={this.handleCondition}
							options={condition}
							inputProps={{ readOnly: true }}
							isSearchable={!(this.props.screenWidth <= 576)}
						/>

						{/* <select id="heating">
						<option defaultValue="">გათბობა</option>
					</select> */}
						<Select
							isMulti
							theme={(theme) => ({
								...theme,
								borderRadius: 0,
								colors: {
									...theme.colors,
									primary25: 'rgba(252, 136, 22, 0.25)',
									primary: 'rgba(252, 136, 22, 1)'
								}
							})}
							name="d21asdd"
							className="heating"
							placeholder="გათბობა"
							value={selectedHeating}
							onChange={this.handleHeating}
							options={heating}
							inputProps={{ readOnly: true }}
							isSearchable={!(this.props.screenWidth <= 576)}
						/>
						{/* <select id="hotWater">
						<option defaultValue="">წყლ. გათბობა</option>
					</select> */}
						<Select
							isMulti
							theme={(theme) => ({
								...theme,
								borderRadius: 0,
								colors: {
									...theme.colors,
									primary25: 'rgba(252, 136, 22, 0.25)',
									primary: 'rgba(252, 136, 22, 1)'
								}
							})}
							name="dddasd12da"
							className="hotWater"
							placeholder="წყლ. გათბობა"
							value={selectedHotWater}
							onChange={this.handleHotWater}
							options={hotWater}
							inputProps={{ readOnly: true }}
							isSearchable={!(this.props.screenWidth <= 576)}
						/>
						{/* <select id="storeroom">
						<option defaultValue="">სათავსო</option>
					</select> */}
						<Select
							isMulti
							theme={(theme) => ({
								...theme,
								borderRadius: 0,
								colors: {
									...theme.colors,
									primary25: 'rgba(252, 136, 22, 0.25)',
									primary: 'rgba(252, 136, 22, 1)'
								}
							})}
							name="ddwd121fwas"
							className="storeroom"
							placeholder="სათავსო"
							value={selectedStoreroom}
							onChange={this.handleStoreroom}
							options={storeroom}
							inputProps={{ readOnly: true }}
							isSearchable={!(this.props.screenWidth <= 576)}
						/>
						{/* <select id="parking">
						<option defaultValue="">პარკინგი</option>
					</select> */}
						<Select
							isMulti
							theme={(theme) => ({
								...theme,
								borderRadius: 0,
								colors: {
									...theme.colors,
									primary25: 'rgba(252, 136, 22, 0.25)',
									primary: 'rgba(252, 136, 22, 1)'
								}
							})}
							name="dd12asd12s"
							className="parking"
							placeholder="პარკინგი"
							value={selectedParking}
							onChange={this.handleParking}
							options={parking}
							inputProps={{ readOnly: true }}
							isSearchable={!(this.props.screenWidth <= 576)}
						/>
					</div>
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
						id="submit"
						className="btn btn-primary"
						style={{
							boxShadow: '2px 2px 5px rgba(200, 200, 200, 1'
						}}
					>
						ძებნა
					</button>
					<span className="addFilter" onClick={this.showAdditional}>
						<i className={'icon-sushi fas ' + (this.state.additional ? 'fa-plus' : 'fa-minus')} /> დეტ.
						ძებნა
					</span>
				</div>
			</div>
		);
	}
}

export default Filter;
