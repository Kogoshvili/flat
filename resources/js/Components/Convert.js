import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';

class Convert extends React.Component {
	state = { val: 0 };

	componentDidMount() {
		console.log(this.props);

		var from = this.props.from,
			to = this.props.to,
			date = this.props.date,
			val = this.props.val,
			//key = '6f7ef852a3d8b1bf93eb72300fc1ee1d',
			API = `https://api.exchangeratesapi.io/latest?base=${from}&symbols=${to}`;
		//API = `http://data.fixer.io/api/convert${date}?base=${from}&symbols=${from},${to}`;
		console.log(API);

		Axios.get(API)
			.then((response) => response.json())
			.then((data) => this.setState({ val: data['rates'][to] * val }));
		//	.catch((e) => this.setState({ val: e }));
	}

	render() {
		return <div>{this.state.val}</div>;
	}
}
Convert.PropTypes = {
	from: PropTypes.string.isRequired,
	to: PropTypes.string.isRequired,
	date: PropTypes.string,
	val: PropTypes.string.isRequired
};
export default Convert;
