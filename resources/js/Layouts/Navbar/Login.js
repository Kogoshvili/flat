import React, { Component } from 'react';
import './Login.scss';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn } from '../../Store/Actions/authActions';
import { withFirebase } from 'react-redux-firebase';
import { compose } from 'redux';

export class Login extends Component {
	state = {
		email: '',
		password: ''
	};
	handleChange = (e) => {
		this.setState({ [e.target.id]: e.target.value });
	};
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.signIn(this.state, this.props);
	};
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div className="row">
					<div className="col-12">
						<input
							className="css-o3h76h-control"
							type="email"
							id="email"
							placeholder="Email"
							onChange={this.handleChange}
						/>
					</div>
					<div className="col-12" style={{ marginTop: '5px' }}>
						<input
							className="css-o3h76h-control"
							type="password"
							id="password"
							placeholder="Password"
							onChange={this.handleChange}
						/>
					</div>
					<p style={{ color: 'red' }}>{this.props.authError}</p>
					<div className="col-12" style={{ marginTop: '20px' }}>
						<button className="btn btn-primary btn-sm">შესვლა</button>
						<br />
						<Link to="/registration">რეგისტრაცია</Link>
					</div>
				</div>
			</form>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		authError: state.auth.authError
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		signIn: (ownProps, creds) => dispatch(signIn(ownProps, creds))
	};
};

const enhance = compose(withFirebase, connect(mapStateToProps, mapDispatchToProps));

export default enhance(Login);
