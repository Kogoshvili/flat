import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUp, editProfile, loadProfile } from '../Store/Actions/authActions';
import { withFirebase, withFirestore } from 'react-redux-firebase';
import { compose } from 'redux';
import Gmaps from '../Components/Gmaps';
import Dropzone from 'react-dropzone';
import { Field, reduxForm } from 'redux-form';
import RequiredInput from '../Components/RequiredInput';
import animateScrollTo from 'animated-scroll-to';
import './Registration/Registration.scss';
import RenderSelectInput from '../Components/RenderSelectInput';
import CurrencyFormat from 'react-currency-format';

const required = (value) => (value ? undefined : 'Required');
const number = (value) => (value && isNaN(Number(value)) ? 'Must be a number' : undefined);
const parse = (value) => (value === undefined ? undefined : parseInt(value));
export class Registration extends Component {
	state = {
		Email: '',
		firstName: '',
		lastName: '',
		password: '',
		image: null,
		show: false,
		logo: null,
		agencies: null,
		edit: false
	};
	componentDidMount() {
		if (this.props.auth.uid) {
			this.setState({
				edit: true
			});
			//this.props.loadProfile(this.props.auth, this.props.profile, this.props.firestore);
		}
	}
	shouldComponentUpdate(newProps, newState) {
		if (this.props.auth.uid !== newProps.auth.id) {
			newProps.loadProfile(newProps.auth, newProps.profile, newProps.firestore);
			if (!this.state.edit) {
				this.setState({
					edit: true
				});
			}
		}
		if (newProps.initialValues) {
			if (newProps.initialValues.image && this.state.image === null) {
				this.setState({
					image: newProps.initialValues.image
				});
				console.log('here');
				// this.setState({
				// 	agencies: { value: newProps.initialValues.agency, label: newProps.initialValues.agencyName }
				// });
			}
			if (newProps.initialValues.owner && !this.state.show) {
				this.setState({ show: true, logo: newProps.initialValues.logo ? newProps.initialValues.logo : null });
			}
		}
		return true;
	}
	handleChange = (e) => {
		this.setState({ [e.target.id]: e.target.value });
	};
	handleSubmit = (e) => {
		e.image = this.state.image;
		e.logo = this.state.logo;
		e.newAgencie = this.state.show;
		e.agency = this.state.agencies;
		if (this.state.edit) {
			e.id = this.props.auth.uid;
			//console.log(this.props);
			this.props.editProfile(e, this.props.initialValues, this.props.firestore, this.props.firebase);
		} else {
			this.props.signUp(e, this.props);
		}
	};
	handleSelectChange = (e, name) => {
		if (this.state[name] !== e) {
			this.setState({ [name]: e });
		}
	};
	handleSelectChange = (e, name) => {
		if (this.state[name] !== e) {
			this.setState({ [name]: e });
		}
	};

	render() {
		const { handleSubmit } = this.props;
		///		console.log(this.props);

		return (
			<div className="container Registration">
				<h3 className="border-bottom text-center">{this.state.edit ? 'რედაქტირება' : 'რეგისტრაცია'}</h3>
				<br />
				<form onSubmit={handleSubmit(this.handleSubmit)}>
					<div className="row">
						<div className="col-md-8">
							<div className="row justify-content-between">
								<div className="col-md-6">
									<label htmlFor="firstName">სახელი</label>
									<Field
										className="css-o3h76h-control"
										component={RequiredInput}
										id="firstName"
										name="firstName"
										placeholder="არჩევა..."
										validate={[ required ]}
										onChange={this.handleChange}
									/>
								</div>
								<div className="col-md-6">
									<label htmlFor="lastName">გვარი</label>
									<Field
										className="css-o3h76h-control"
										component={RequiredInput}
										id="lastName"
										name="lastName"
										placeholder="არჩევა..."
										validate={[ required ]}
										onChange={this.handleChange}
									/>
								</div>
								<div className="col-md-6">
									<label htmlFor="Email">ელ-ფოსტა</label>
									<Field
										className="css-o3h76h-control"
										component={RequiredInput}
										id="Email"
										name="Email"
										disabled={this.state.edit}
										placeholder="არჩევა..."
										validate={[ required ]}
										onChange={this.handleChange}
									/>
								</div>
								<div className="col-md-6">
									<label htmlFor="password">პაროლი</label>
									<Field
										className="css-o3h76h-control"
										component={RequiredInput}
										type="password"
										id="password"
										name="password"
										placeholder="არჩევა..."
										validate={this.state.edit ? [] : [ required ]}
										onChange={this.handleChange}
									/>
								</div>
								<div className="col-md-6">
									<label htmlFor="Phone">ტელეფონი</label>
									<Field
										className="css-o3h76h-control"
										component={RequiredInput}
										id="Phone"
										name="Phone"
										placeholder="არჩევა..."
										validate={this.state.show ? [ required ] : []}
										onChange={(v) => this.handleSelectChange(v, 'district')}
									/>
								</div>
								<div className="col-md-6">
									<label htmlFor="agencies">სააგენტო</label>
									<Field
										component={RenderSelectInput}
										id="agencies"
										name="agencies"
										async={true}
										disabled={this.state.show || this.state.edit}
										placeholder="არჩევა..."
										selected={this.state.agencies}
										validate={!(this.state.show || this.state.edit) ? [ required ] : []}
										onChange={(v) => this.handleSelectChange(v, 'agencies')}
									/>
								</div>
							</div>
						</div>
						<div className="col-md-4">
							<div className="row">
								<div className="col-md-6">
									<Dropzone
										accept="image/*"
										maxSize={52428800}
										onDrop={(acceptedFiles) => {
											const file = acceptedFiles[0];
											const reader = new FileReader();
											reader.addEventListener(
												'load',
												() =>
													this.setState({
														image: reader.result
													}),
												false
											);
											reader.readAsDataURL(file);
										}}
									>
										{({ getRootProps, getInputProps }) => (
											<section>
												<div
													{...getRootProps()}
													style={{
														textAlign: 'center',
														height: '120px',
														width: '100%',
														background: '#ddd',
														border: '3px dashed #83ae3e'
													}}
												>
													<input {...getInputProps()} />
													<p style={{ paddingTop: '40px' }}>სურათის ატვირთვა</p>
												</div>
											</section>
										)}
									</Dropzone>
								</div>
								{this.state.image !== null ? (
									<div className="col-md-6">
										<img
											onClick={(e) => this.setState({ image: null })}
											src={this.state.image}
											style={{ height: '120px' }}
										/>
									</div>
								) : (
									''
								)}
							</div>
						</div>
					</div>
					{!this.state.edit ? (
						<div className="row justify-content-center">
							<div className="col-md-4 text-center">
								<div
									className="pretty p-icon p-curve p-smooth p-toggle"
									style={{ marginRight: '0', zIndex: '0' }}
								>
									<Field
										className="css-o3h76h-control"
										type="checkbox"
										component="input"
										id="television"
										name="television"
										onChange={() =>
											this.setState((prevState) => {
												return {
													show: !prevState.show,
													agencies: null
												};
											})}
									/>
									<div className="state p-primary p-on">
										<i className="icon fa fa-check" />
										<label>ახალი სააგენტო?</label>
									</div>
									<div className="state p-danger p-off">
										<i className="icon fa fa-close" />
										<label>ახალი სააგენტო?</label>
									</div>
								</div>
							</div>
						</div>
					) : (
						''
					)}
					<div
						className="row justify-content-between"
						style={{
							display: this.state.show ? 'flex' : 'none'
						}}
					>
						<div className="col-md-8">
							<div className="row">
								<div className="col-md-6">
									<label htmlFor="name">სახელწოდება</label>
									<Field
										className="css-o3h76h-control"
										component={RequiredInput}
										id="name"
										name="name"
										placeholder="არჩევა..."
										validate={this.state.show ? [ required ] : []}
										onChange={this.handleChange}
									/>
								</div>
								<div className="col-md-6">
									<label htmlFor="phone">ტელეფონი</label>
									<Field
										className="css-o3h76h-control"
										component={RequiredInput}
										id="phone"
										name="phone"
										placeholder="არჩევა..."
										validate={this.state.show ? [ required ] : []}
										onChange={this.handleChange}
									/>
								</div>
							</div>
							<div className="row">
								<div className="col-md-6">
									<label htmlFor="email">ელ-ფოსტა</label>
									<Field
										className="css-o3h76h-control"
										component={RequiredInput}
										id="email"
										name="email"
										placeholder="არჩევა..."
										validate={this.state.show ? [ required ] : []}
										onChange={this.handleChange}
									/>
								</div>
								<div className="col-md-6">
									<label htmlFor="location">მისამართი</label>
									<Field
										className="css-o3h76h-control"
										component="input"
										type="text"
										id="location"
										name="location"
										placeholder="არჩევა..."
										onChange={this.handleChange}
									/>
								</div>
							</div>

							<div className="row">
								<div className="col-md-6">
									<label htmlFor="site">საიტი</label>
									<Field
										className="css-o3h76h-control"
										component="input"
										type="text"
										id="site"
										name="site"
										placeholder="არჩევა..."
										onChange={this.handleChange}
									/>
								</div>
								<div className="col-md-6">
									<label htmlFor="facebook">facebook</label>
									<Field
										className="css-o3h76h-control"
										component="input"
										type="text"
										id="facebook"
										name="facebook"
										placeholder="არჩევა..."
										onChange={this.handleChange}
									/>
								</div>
								<div className="col-md-6">
									<label htmlFor="instagram">instagram</label>
									<Field
										className="css-o3h76h-control"
										component="input"
										type="text"
										id="instagram"
										name="instagram"
										placeholder="არჩევა..."
										onChange={this.handleChange}
									/>
								</div>
								<div className="col-md-6">
									<label htmlFor="youtube">youtube</label>
									<Field
										className="css-o3h76h-control"
										component="input"
										type="text"
										id="youtube"
										name="youtube"
										placeholder="არჩევა..."
										onChange={this.handleChange}
									/>
								</div>
							</div>
						</div>
						<div className="col-md-4">
							<div className="row">
								<div className="col-md-6">
									<Dropzone
										accept="image/*"
										maxSize={52428800}
										onDrop={(acceptedFiles) => {
											const file = acceptedFiles[0];
											const reader = new FileReader();
											reader.addEventListener(
												'load',
												() =>
													this.setState({
														logo: reader.result
													}),
												false
											);
											reader.readAsDataURL(file);
										}}
									>
										{({ getRootProps, getInputProps }) => (
											<section>
												<div
													{...getRootProps()}
													style={{
														textAlign: 'center',
														height: '120px',
														width: '100%',
														background: '#ddd',
														border: '3px dashed #83ae3e'
													}}
												>
													<input {...getInputProps()} />
													<p style={{ paddingTop: '40px' }}>ლოგოს ატვირთვა</p>
												</div>
											</section>
										)}
									</Dropzone>
								</div>
								{this.state.logo !== null ? (
									<div className="col-md-6">
										<img
											onClick={(e) => this.setState({ logo: null })}
											src={this.state.logo}
											style={{ height: '120px' }}
										/>
									</div>
								) : (
									''
								)}
							</div>
						</div>
					</div>
					<div className="row justify-content-center">
						<div className="col-md-4 text-center">
							<button className="btn btn-primary">
								{this.state.edit ? 'რედაქტირება' : 'რეგისტრაცია'}
							</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		signUp: (creds, ownProps) => dispatch(signUp(creds, ownProps)),
		loadProfile: (id, profile, ownProps) => {
			dispatch(loadProfile(id, profile, ownProps));
		},
		editProfile: (creds, oldCreds, ownProps, firebase) => {
			dispatch(editProfile(creds, oldCreds, ownProps, firebase));
		}
	};
};

const mapStateToProps = (state, ownProps) => {
	//console.log('state', state);

	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile,
		initialValues: state.auth.data
	};
};

export default compose(withFirebase, withFirestore, connect(mapStateToProps, mapDispatchToProps))(
	reduxForm({
		form: 'registration',
		enableReinitialize: true
	})(Registration)
);
