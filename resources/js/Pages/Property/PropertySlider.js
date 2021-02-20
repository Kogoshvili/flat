import React, { Component } from 'react';
import Swiper from 'react-id-swiper/lib/ReactIdSwiper.full';
import { Navigation } from 'swiper/dist/js/swiper.esm';
import './PropertySlider.scss';
import windowSize from 'react-window-size';
import ImageGallery from 'react-image-gallery';
export class PropertySlider extends Component {
	state = {
		windowWidth: 1920
	};
	shouldComponentUpdate(newProps) {
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
		let params = {
			observer: true,
			simulateTouch: true,
			//spaceBetween: this.state.windowWidth > 1200 ? 30 : 0,
			//slidesPerView: this.state.windowWidth > 1200 ? 3 : 1,
			centeredSlides: true,
			autoplay: {
				delay: 5000
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true
			},
			//autoplayDisableOnInteraction: false,
			//loop: true,
			modules: [ Navigation ],
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},

			renderPrevButton: () => <button className="swiper-button-prev" />,
			renderNextButton: () => <button className="swiper-button-next" />
		};
		const { images } = this.props;
		//console.log('PropertySlider', this.state.windowWidth, params.slidesPerView);

		const slides = images.length ? (
			images.map((image, index) => {
				return (
					<div key={index}>
						<div className="swiper-img" style={{ backgroundImage: 'url(' + image + ')' }} />
					</div>
				);
			})
		) : (
			<div />
		);
		return (
			<div>
				<div className="PropertySlider">
					<Swiper {...params}>{slides}</Swiper>
				</div>
			</div>
		);
	}
}

export default windowSize(PropertySlider);
