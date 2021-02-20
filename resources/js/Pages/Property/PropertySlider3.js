import React, { Component } from 'react';
import Swiper from 'react-id-swiper/lib/ReactIdSwiper.full';
import { Navigation } from 'swiper/dist/js/swiper.esm';
import windowSize from 'react-window-size';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './PropertySlider.scss';
class ProductSlider extends Component {
	state = {
		windowWidth: 1920
	};
	// shouldComponentUpdate(newProps) {
	// 	if (
	// 		newProps.windowWidth !== this.props.windowWidth &&
	// 		newProps.windowWidth > 1200 !== this.state.windowWidth > 1200
	// 	) {
	// 		this.setState({
	// 			windowWidth: newProps.windowWidth
	// 		});
	// 	}
	// 	return true;
	// }
	render() {
		const { images } = this.props;

		//console.log('PropertySlider', this.state.windowWidth, params.slidesPerView);

		const slides = images.length ? (
			images.map((image) => {
				return {
					original: image
					//thumbnail: image
				};
			})
		) : (
			<div />
		);
		return (
			<div className="imgGallery">
				<ImageGallery items={slides} />
			</div>
		);
	}
}

export default windowSize(ProductSlider);
