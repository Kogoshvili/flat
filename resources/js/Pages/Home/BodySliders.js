import React, { Component } from 'react';
import PropertiesSlider from './PropertiesSlider';
import './BodySliders.scss';
export class BodySliders extends Component {
	render() {
		return (
			<div className="bg-gray">
				<div className="BodySliders">
					<h5 style={{ margin: '20px 0 20px 0px', fontSize: '20px' }}>
						<span className="icon-sushi fa fa-building" /> ბინები
					</h5>
					<PropertiesSlider type="apartment" />

					<h5 style={{ margin: '20px 0 20px 0px', fontSize: '20px' }}>
						<span className="icon-sushi fa fa-home" /> სახლები
					</h5>
					<PropertiesSlider type="house" />

					<h5 style={{ margin: '20px 0 20px 0px', fontSize: '20px' }}>
						<span className="icon-sushi fas fa-users" /> სააგენტოები
					</h5>
					<PropertiesSlider additional={true} type="agencies" />

					{/*<h5 style={{ margin: '20px 0 20px 0px', fontSize: '20px' }}>
						<span className="icon-sushi fa fa-building" /> დეველოპერები
					</h5> 
					<PropertiesSlider type="developers" />*/}

					<h5 style={{ margin: '20px 0 20px 0px', fontSize: '20px' }}>
						<span className="icon-sushi fa fa-briefcase" /> კომერციული ფართები
					</h5>
					<PropertiesSlider type="commercial" />
					<h5 style={{ margin: '20px 0 20px 0px', fontSize: '20px' }}>
						<span className="icon-sushi fas fa-hotel" /> სასტუმროები
					</h5>
					<PropertiesSlider type="hotel" />
					<h5 style={{ margin: '20px 0 20px 0px', fontSize: '20px' }}>
						<span className="icon-sushi fa fa-tree" /> მიწის ნაკვეთები
					</h5>
					<PropertiesSlider type="land" />
				</div>
			</div>
		);
	}
}

export default BodySliders;
