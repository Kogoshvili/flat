import React, { Component } from 'react';
import Swiper from 'react-id-swiper/lib/ReactIdSwiper.full';
import PartnerCard from './PartnerCard';
import './PartnerSlider.scss';
export class PartnerSlider extends Component {
	render() {
		const params = {
			slidesPerView: 8,
			autoplay: {
				delay: 5000
			},
			autoplayDisableOnInteraction: false,
			loop: true,

			breakpoints: {
				1450: {
					slidesPerView: 7
				},
				1250: {
					slidesPerView: 6
				},
				1150: {
					slidesPerView: 5
				},
				950: {
					slidesPerView: 4
				},
				800: {
					slidesPerView: 3
				},
				550: {
					slidesPerView: 2
				},
				370: {
					slidesPerView: 1
				}
			}
		};
		return (
			<div className="PartnerSlider">
				<Swiper {...params}>
					<div>
						<PartnerCard />
					</div>
					<div>
						<PartnerCard />
					</div>
					<div>
						<PartnerCard />
					</div>
					<div>
						<PartnerCard />
					</div>
					<div>
						<PartnerCard />
					</div>
					<div>
						<PartnerCard />
					</div>
					<div>
						<PartnerCard />
					</div>
					<div>
						<PartnerCard />
					</div>
					<div>
						<PartnerCard />
					</div>
					<div>
						<PartnerCard />
					</div>
				</Swiper>
			</div>
		);
	}
}

export default PartnerSlider;
