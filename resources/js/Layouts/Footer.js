import React, { Component } from 'react';
import './Footer.scss';
export class Footer extends Component {
	render() {
		return (
			<div>
				<footer className="Footer text-center bg-dark">
					<div className="container">
						<div className="">
							<a href="/" className="">
								Rima
							</a>
						</div>
						<ul className="icons">
							<li>
								<i className="icon-primary fab fa-facebook" />
							</li>
							<li>
								<i className="icon-primary fab fa-instagram" />
							</li>
							<li>
								<i className="icon-primary fas fa-rss" />
							</li>
						</ul>
						<p style={{ color: '#fff' }}>
							<span>©</span>
							All Rights Reserved
						</p>
					</div>
				</footer>
			</div>
		);
	}
}

export default Footer;
