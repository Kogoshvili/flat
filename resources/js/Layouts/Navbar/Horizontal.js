import React, { Component } from 'react';
import './Horizontal.scss';
import { NavLink, Link } from 'react-router-dom';
import Login from './Login';
import { connect } from 'react-redux';
import { signOut } from '../../Store/Actions/authActions';
import { withFirebase } from 'react-redux-firebase';
import { compose } from 'redux';
import CurLen from '../../Components/CurLen';

export class Horizontal extends Component {
	state = {
		login: false,
		userMenu: false,
		absolute: true
	};
	shouldComponentUpdate(newProps, newState) {
		if (newProps.auth.uid && this.state.login) {
			this.setState({ login: false });
		}
		return true;
	}
	handleClick = (e) => {
		this.setState((prevState) => {
			return {
				login: !prevState.login
			};
		});
	};
	render() {
		let user;
		if (this.props.auth.uid) {
			user = (
				<div className="dropdown">
					<button
						className="btn btn-primary dropdown-toggle"
						type="button"
						onClick={() => {
							this.setState((prevState) => {
								return {
									userMenu: !prevState.userMenu
								};
							});
						}}
					>
						აგენტის მენიუ
					</button>
					<div className={`dropdown-menu dropdown-menu-right ${this.state.userMenu && 'show'}`}>
						<Link
							className="dropdown-item"
							to={'/agency/' + (this.props.auth.uid ? this.props.profile.agency : '')}
						>
							ჩემი კომპანია
						</Link>
						<Link
							className="dropdown-item"
							to={'/agent/' + (this.props.auth.uid ? this.props.auth.uid : '')}
						>
							ჩემი განცხადებები
						</Link>
						<Link className="dropdown-item" to="/create">
							განცხადების განთავსება
						</Link>
						<Link className="dropdown-item" to="/registration">
							ინფო. რედაქტირება
						</Link>
						<a href="/" className="dropdown-item" onClick={() => this.props.signOut(this.props)}>
							გამოსვლა
						</a>
					</div>
				</div>
			);
		} else {
			user = (
				<ul className="navbar-nav">
					<li className="nav-item">
						<Link to="/create">
							<button className="btn btn-primary">განცხადების განთავსება</button>
						</Link>
					</li>
					<li className="nav-item">
						<div className="dropdown">
							<button
								className="btn btn-primary dropdown-toggle"
								type="button"
								onClick={() => {
									this.setState((prevState) => {
										return {
											login: !prevState.login
										};
									});
								}}
							>
								შესვლა/რეგისტრაცია
							</button>
							<div className={`Login dropdown-menu ${this.state.login && 'show'}`}>
								<Login />
							</div>
						</div>
					</li>
				</ul>
			);
		}

		return (
			<div className="Horizontal" style={this.props.absolute ? { position: 'absolute' } : { position: 'static' }}>
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<div className="collapse navbar-collapse">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item brand">
								<NavLink className="nav-link" to="/">
									Rima
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/products">
									კატალოგი
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/agencies">
									სააგენტოები
								</NavLink>
							</li>
							{/* 
							<li className="nav-item">
								<NavLink className="nav-link" to="/developers">
									დეველოპერები
								</NavLink>
							</li> */}
						</ul>
						{/* <ul>
							<CurLen />
						</ul> */}
						{user}
					</div>
				</nav>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	//console.log(state);

	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		signOut: (ownProps) => dispatch(signOut(ownProps))
	};
};

const enhance = compose(withFirebase, connect(mapStateToProps, mapDispatchToProps));

export default enhance(Horizontal);
