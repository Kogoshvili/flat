import React, { Component } from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/lib/Async';
import { withFirestore } from 'react-redux-firebase';
import { compose } from 'redux';
export const colourOptions = [
	{ value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
	{ value: 'blue', label: 'Blue', color: '#0052CC', disabled: true },
	{ value: 'purple', label: 'Purple', color: '#5243AA' },
	{ value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
	{ value: 'orange', label: 'Orange', color: '#FF8B00' },
	{ value: 'yellow', label: 'Yellow', color: '#FFC400' },
	{ value: 'green', label: 'Green', color: '#36B37E' },
	{ value: 'forest', label: 'Forest', color: '#00875A' },
	{ value: 'slate', label: 'Slate', color: '#253858' },
	{ value: 'silver', label: 'Silver', color: '#666666' }
];

class RenderSelectInput extends Component {
	// onChange(event) {
	// 	if (this.props.input.onChange && event != null) {
	// 		this.props.input.onChange(event.label);
	// 	} else {
	// 		this.props.input.onChange(null);
	// 	}
	// }

	state = {
		id: null,
		city: null,
		district: null,
		street: null,
		category: null,
		inputValue: ''
	};
	componentWillReceiveProps(props) {
		if (props.id === 'city' || props.id === 'district' || props.id === 'street') {
			if (this.state.city !== props.city) {
				this.setState({ city: props.city });
			}
			if (this.state.district !== props.district) {
				this.setState({ district: props.district });
			}
		}
	}
	filterColors = (inputValue, data) => {
		return data.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()));
	};

	promiseOptions = (inputValue, id, city, district) => {
		if (id === 'city') {
			return new Promise((resolve) => {
				this.props.firestore.collection('locations').doc('locations').get().then((doc) => {
					let res = doc.data().cities;
					res = this.filterColors(inputValue, res);
					resolve(res);
				});
			});
		} else if (id === 'district' && city !== null) {
			return new Promise((resolve) => {
				this.props.firestore
					.collection('locations')
					.doc('locations')
					.collection(city.label)
					.doc('districts')
					.get()
					.then((doc) => {
						let res = doc.data().districts;
						res = this.filterColors(inputValue, res);
						resolve(res);
					});
			});
		} else if (id === 'street' && district !== null) {
			return new Promise((resolve) => {
				if (Array.isArray(this.state.district)) {
					const streetLst = district.map((dist) => {
						return this.props.firestore
							.collection('locations')
							.doc('locations')
							.collection(city.label)
							.doc(dist.label)
							.get()
							.then((doc) => {
								return doc.data().streets;
							});
					});
					Promise.all(streetLst).then((doc) => {
						var res = [].concat.apply([], doc);
						//let res = doc.data().streets;
						res = this.filterColors(inputValue, res);
						//console.log(res);
						resolve(res);
					});
				} else {
					this.props.firestore
						.collection('locations')
						.doc('locations')
						.collection(city.label)
						.doc(district.label)
						.get()
						.then((doc) => {
							let res = doc.data().streets;
							res = this.filterColors(inputValue, res);
							resolve(res);
						});
				}
			});
		} else if (id === 'agencies' || id == 'developers') {
			return new Promise((resolve) => {
				this.props.firestore.collection(id).orderBy('name').get().then((snapshot) => {
					let res = [];
					snapshot.forEach(function(doc) {
						res.push({ value: doc.id, label: doc.data().name });
					});
					res = this.filterColors(inputValue, res);
					resolve(res);
				});
			});
		}
	};
	handleInputChange = (newValue) => {
		const inputValue = newValue.replace(/\W/g, '');
		this.setState({ inputValue });
		return inputValue;
	};

	render() {
		const {
			input,
			options,
			id,
			placeholder,
			disabled,
			async,
			city,
			district,
			street,
			selected,
			multi,
			meta: { touched, error },
			defaultValue,
			...field
		} = this.props;
		//console.log(input);

		if (async) {
			let key = this.state.city;
			if (id == 'street') {
				key = this.state.district;
			}
			let isdisabled;
			if (disabled == null && id !== 'city') {
				isdisabled = true;
			} else if (this.state.city) {
				if (this.state.city.label !== 'თბილისი') isdisabled = true;
			} else {
				isdisabled = disabled;
			}

			return (
				<div>
					<AsyncSelect
						theme={(theme) => ({
							...theme,
							borderRadius: 0,
							colors: {
								...theme.colors,
								primary25: 'rgba(252, 136, 22, 0.25)',
								primary: 'rgba(252, 136, 22, 1)'
							}
						})}
						isMulti={multi}
						key={JSON.stringify(key)}
						cacheOption
						defaultOptions
						loadOptions={(e) => {
							return this.promiseOptions(e, id, city, district);
						}}
						inputProps={{ readOnly: true }}
						isSearchable={true}
						id={id}
						placeholder={placeholder}
						defaultValue={defaultValue}
						value={(input.value = selected)}
						onChange={input.onChange}
						{...input}
						onBlur={() => input.onBlur()}
						isDisabled={isdisabled}
						onBlurResetsInput={false}
						onCloseResetsInput={false}
					/>
					<div>
						{touched &&
						error && <div style={{ fontSize: '12px', color: 'rgb(244, 67, 54)' }}>Required</div>}
					</div>
				</div>
			);
		} else {
			return (
				<div>
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
						inputProps={{ readOnly: true }}
						isSearchable={!(this.props.screenWidth <= 576)}
						id={id}
						placeholder={placeholder}
						value={(input.value = selected)}
						options={options}
						onChange={input.onChange}
						onBlurResetsInput={false}
						onCloseResetsInput={false}
						defaultValue={defaultValue}
						{...input}
						isDisabled={disabled}
						onBlur={() => input.onBlur()}
					/>
					<div>
						{touched &&
						error && <div style={{ fontSize: '12px', color: 'rgb(244, 67, 54)' }}>Required</div>}
					</div>
				</div>
			);
		}
	}
}

const enhance = compose(withFirestore);
export default enhance(RenderSelectInput);
