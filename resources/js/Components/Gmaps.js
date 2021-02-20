import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = () => (
	<div>
		<img
			src="./images/mapPin.png"
			alt=""
			style={{
				width: '20px',
				top: '-40px',
				left: '-10px',
				position: 'absolute'
			}}
		/>
	</div>
);

class Gmaps extends Component {
	static defaultProps = {
		zoom: 11
	};
	state = {
		lat: null,
		lng: null,
		center: {
			lat: 41.71,
			lng: 44.82
		}
	};
	componentDidMount() {
		if (this.props.location && this.props.location.lat !== null) {
			this.setState({
				lat: this.props.location.lat,
				lng: this.props.location.lng
			});
			if (this.props.disabled) {
				this.setState({
					center: {
						lat: this.props.location.lat,
						lng: this.props.location.lng
					}
				});
			}
		}
	}
	shouldComponentUpdate(newProps) {
		if (newProps.location !== this.props.location) {
			this.setState({
				lat: newProps.location.lat,
				lng: newProps.location.lng
			});
			if (newProps.disabled) {
				this.setState({
					center: {
						lat: newProps.location.lat,
						lng: newProps.location.lng
					}
				});
			}
		}
		return true;
	}
	mapClick(e) {
		if (!this.props.disabled) {
			this.setState({
				lat: e.lat,
				lng: e.lng
			});
			this.props.onClick(e);
		}
	}

	render() {
		return (
			// Important! Always set the container height explicitly
			<div style={{ height: '300px', width: '100%' }}>
				<GoogleMapReact
					bootstrapURLKeys={{ key: 'AIzaSyBsJcxkDvXd-T4LEy4MqvFqHe-_qq6tYcg ' }}
					defaultCenter={this.state.center}
					defaultZoom={this.props.zoom}
					onClick={(e) => this.mapClick(e)}
				>
					<AnyReactComponent lat={this.state.lat} lng={this.state.lng} />
				</GoogleMapReact>
			</div>
		);
	}
}

export default Gmaps;
