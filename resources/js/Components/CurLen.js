import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Select from 'react-select';
import { Field, reduxForm } from 'redux-form';
import RenderSelectInput from './RenderSelectInput';
import './CurLen.scss';
const currencies = [
	{ value: 'GEL', label: '₾' },
	{ value: 'USD', label: '$' },
	{ value: 'EUR', label: '€' }
	//{ value: 'ruble', label: '₽' }
];
export class CurLen extends Component {
	state = {
		currency: { value: 'GEL', label: '₾' },
		language: null
	};
	componentWillMount() {
		this.props.initialize({ currency: { value: 'GEL', label: '₾' } });
	}
	componentWillReceiveProps(nextProps) {
		//console.log(nextProps);

		//if (/* nextProps changed in a way to reset default values */) {
		this.props.destroy();
		//this.props.initialize({…});
		//}
	}
	handleChange = (selectedOption) => {
		this.setState({ currency: selectedOption });
		//console.log(`Option selected:`, selectedOption);
	};
	handleSelectChange = (e, name) => {
		if (this.state[name] !== e) this.setState({ [name]: e });
	};
	render() {
		//console.log(this.props);
		const { handleSubmit } = this.props;

		return (
			<div className="CurLen">
				<form onSubmit={handleSubmit}>
					<div style={{ width: '200px' }}>
						<Field
							component={RenderSelectInput}
							id="street"
							name="street"
							options={currencies}
							placeholder="არჩევა..."
							//selected={this.state.currency}
							onChange={(v) => this.handleSelectChange(v, 'street')}
						/>
					</div>
				</form>
			</div>
		);
	}
}
// const mapStateToProps = (state, ownProps) => {
// 	console.log('map', state);
// 	return {
// 		//filter: state.form.filter,
// 		//properties: state.firestore.ordered.properties
// 		//firestore: state.firestore
// 	};
// };

export default reduxForm({
	form: 'curLen'
})(CurLen);
