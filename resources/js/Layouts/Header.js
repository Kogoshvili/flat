import React, { Component } from 'react';
import '../Layouts/Header.scss';
import Horizontal from './Navbar/Horizontal';
import Vertical from './Navbar/Vertical';
import windowSize from 'react-window-size';

export class Header extends Component {
	state = {
		windowWidth: 1920,
		absolute: true
	};
	componentDidMount() {
		if (this.props.match.isExact !== this.state.absolute) {
			this.setState({
				absolute: this.props.match.isExact
			});
		}
		if (this.props.windowWidth > 1200 !== this.state.windowWidth > 1200) {
			this.setState({
				windowWidth: this.props.windowWidth
			});
		}
	}
	shouldComponentUpdate(newProps) {
		if (newProps.match.isExact !== this.state.absolute) {
			this.setState({
				absolute: newProps.match.isExact
			});
		}
		if (
			newProps.windowWidth !== this.props.windowWidth &&
			newProps.windowWidth > 1200 !== this.state.windowWidth > 1200
		) {
			this.setState({
				windowWidth: newProps.windowWidth
			});
		}
		return true;
	}
	render() {
		if (this.state.windowWidth <= 1200) {
			return <Vertical />;
		} else {
			return <Horizontal absolute={this.state.absolute} />;
		}
	}
}

export default windowSize(Header);
