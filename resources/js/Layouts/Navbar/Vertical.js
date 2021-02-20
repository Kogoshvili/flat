import React, { Component } from 'react';
import { Animated } from 'react-animated-css';
import './Vertical.scss';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn, signOut } from '../../Store/Actions/authActions';
import { withFirebase } from 'react-redux-firebase';
import { compose } from 'redux';
import Modal from 'react-responsive-modal';
import Login from './Login';
export class Vertical extends Component {
	constructor() {
		super();
		this.state = {
			active: false,
			open: false
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleModal = this.handleModal.bind(this);
	}
	componentWillReceiveProps(props) {
		if (props.auth.uid && this.state.open) {
			this.setState({ open: false });
		}
	}
	handleModal() {
		this.setState((prevState) => {
			return {
				open: !prevState.open
			};
		});
	}
	handleClick() {
		this.setState((prevState) => {
			return {
				active: !prevState.active
			};
		});
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.signIn(this.state, this.props);
	};

	render() {
		const { open } = this.state;

		return (
			<div
				style={{
					position: 'absolute',
					zIndex: '3',
					top: '0'
				}}
			>
				<button
					style={{ position: 'fixed', zIndex: '4' }}
					className={`hamburger hamburger--slider ${this.state.active && 'is-active'}`}
					onClick={this.handleClick}
					type="button"
				>
					<span className="hamburger-box">
						<span className="hamburger-inner" />
					</span>
				</button>

				<Animated
					style={{ position: 'fixed', overflow: 'scroll', background: '#fff' }}
					className="faster"
					animationIn="slideInLeft"
					animationOut="slideOutLeft"
					isVisible={this.state.active}
					animateOnMount={false}
				>
					<div className="Vertical">
						<div className="verLogo">
							<Link exact to="/">
								<span>Rima</span>
							</Link>
						</div>
						{this.props.auth.uid && (
							<div className="user">
								<img src={this.props.profile.image || 'images/agent.png'} alt="" className="userImg" />
								<br />
								{this.props.profile.firstName} {this.props.profile.lastName}
							</div>
						)}
						<div>
							<ul>
								<NavLink to="/products">
									<li>კატალოგი</li>
								</NavLink>
								<NavLink to="/agencies">
									<li>სააგენტოები</li>
								</NavLink>
								{/* <NavLink to="/developers">
									<li>დეველოპერები</li>
								</NavLink> */}
								{this.props.auth.uid && (
									<React.Fragment>
										<NavLink
											to={'/agency/' + (this.props.profile ? this.props.profile.agency : '')}
										>
											<li>ჩემი კომპანია</li>
										</NavLink>
										<NavLink to={'/agent/' + (this.props.auth.uid ? this.props.auth.uid : '')}>
											<li>ჩემი განცხადებები</li>
										</NavLink>
										<NavLink to="/registration">
											<li>ინფო. რედაქტირება</li>
										</NavLink>
										<a href="/" onClick={() => this.props.signOut(this.props)}>
											<li>გამოსვლა</li>
										</a>
									</React.Fragment>
								)}
							</ul>
						</div>
						<div>
							<Link to="/create">
								<button className="btn btn-primary">განცხადების განთავსება</button>
							</Link>
							{!this.props.auth.uid && (
								<button className="btn btn-primary" onClick={this.handleModal}>
									შესვლა/რეგისტრაცია
								</button>
							)}
							<Modal open={open} onClose={this.handleModal} center>
								<div
									style={{ textAlign: 'center', width: '200px', height: '250px', paddingTop: '50px' }}
								>
									<Login />
								</div>
							</Modal>
						</div>
					</div>
				</Animated>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
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

export default enhance(Vertical);
