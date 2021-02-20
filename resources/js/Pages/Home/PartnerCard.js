import React, { Component } from 'react';
import './PartnerCard.scss';
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';

export class PartnerCard extends Component {
	state = {
		active: false
	};
	shouldComponentUpdate(newProps) {
		console.log('active', newProps.active);

		if (newProps.active !== this.state.active) {
			this.setState({ active: newProps.active });
		}
		return true;
	}
	render() {
		const active = {
			boxShadow: 'inset 0 0 10px 1px #fc8816'
		};
		const { id, name, phone, site, email, logo } = this.props.company;
		const clicable = this.props.info ? (
			<Link to={'/agency/' + id}>
				<img src={logo} alt="" />
				<p>{name}</p>
			</Link>
		) : (
			<div>
				<img src={logo} alt="" />
				<p>{name}</p>
			</div>
		);

		return (
			<div onClick={(e) => this.props.onClick(e)} className="PartnerCard" style={this.state.active ? active : {}}>
				<div className="brand">{clicable}</div>
				{this.props.info ? (
					<div className="info">
						<a href="/">
							<CurrencyFormat format="(+995) ###-##-##-##" displayType={'text'} value={phone} />
						</a>
						<br />
						<a href="/">{email}</a>
						<br />
						<a href="/">{site && site}</a>
					</div>
				) : (
					''
				)}
			</div>
		);
	}
}

export default PartnerCard;
