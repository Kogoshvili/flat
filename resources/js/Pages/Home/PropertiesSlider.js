import React, { Component } from 'react';
import PropertyCard from '../../Components/PropertyCard';
import PartnerCard from './PartnerCard';
import Swiper from 'react-id-swiper/lib/ReactIdSwiper.full';
import './PropertiesSlider.scss';
import './PartnerSlider.scss';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, isEmpty, withFirestore } from 'react-redux-firebase';
import { compose } from 'redux';
import Axios from 'axios';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';
const override = css`
	display: block;
	margin: 0 auto;
	border-color: red;
`;
export class PropertiesSlider extends Component {
	state = {
		data: null
	};
	componentDidMount() {
		if (this.props.type === 'agencies' || this.props.type === 'developers') {
			this.props.firestore
				.collection('agencies')
				.where('verified', '==', true)
				.limit(20)
				.get()
				.then((snapshot) => {
					const items = [];
					snapshot.forEach((item) => {
						let it = item.data();
						it.id = item.id;
						items.push(it);
					});
					this.setState({ data: items });
				});
		} else {
			if (this.props.type !== 'land') {
				Axios.get(
					'https://flatrima.herokuapp.com/api/properties?filter[category]=' +
						this.props.type +
						'&sort=-priority,-created_at'
				)
					.then((res) => {
						this.setState({
							data: res.data.data
						});
					})
					.catch((e) => console.log(e));
			} else {
				Axios.get('https://flatrima.herokuapp.com/api/lands?sort=-priority,-created_at')
					.then((res) => {
						console.log(res);
						this.setState({
							data: res.data.data
						});
					})
					.catch((e) => console.log(e));
			}
		}
	}
	render() {
		//		console.log(this.state.data !== null ? this.state.data.length : 'null');
		console.log('swiper', this.swiper, this.state.swiper);

		let propertyCart = true;
		if (this.props.type === 'agencies' || this.props.type === 'developers') {
			propertyCart = false;
		}
		const paramsP = {
			observer: true,
			slidesPerView: 6,
			autoplay: {
				delay: 10000
			},
			//spaceBetween: 30,
			autoplayDisableOnInteraction: false,
			breakpoints: {
				1700: {
					slidesPerView: 6
				},
				1301: {
					slidesPerView: 4
				},
				1100: {
					slidesPerView: 3
				},
				825: {
					slidesPerView: 2
				},
				460: {
					slidesPerView: 1
				}
			}
		};
		const paramsA = {
			observer: true,

			slidesPerView: 8,
			autoplay: {
				delay: 5000
			},
			//spaceBetween: 30,
			autoplayDisableOnInteraction: false,
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
		const { data } = this.state;
		var slides;
		if (data === null) {
			slides = (
				<div>
					{' '}
					<ClipLoader
						css={override}
						sizeUnit={'px'}
						size={150}
						color={'#123abc'}
						loading={this.state.loading}
					/>
				</div>
			);
		} else if (data.length === 0) {
			slides = <div>Empty</div>;
		} else {
			slides = data.map((data) => {
				if (propertyCart) {
					return (
						<div key={data.id}>
							<PropertyCard property={data} />
						</div>
					);
				} else {
					return (
						<div key={data.id}>
							<PartnerCard
								active={data.id === this.props.active}
								onClick={() => this.props.onClick(data)}
								info={this.props.additional}
								company={data}
								key={data.id}
							/>
						</div>
					);
				}
			});
		}
		if (propertyCart) {
			return (
				<div className="PropertiesSlider">
					<Swiper {...paramsP}>{slides}</Swiper>
				</div>
			);
		} else {
			return (
				<div className="PartnerSlider">
					<Swiper {...paramsA}>{slides}</Swiper>
				</div>
			);
		}
	}
}
// const mapStateToProps = (state, props) => {
// 	//console.log(state);

// 	return {
// 		items: state.firestore.ordered[props.type]
// 	};
// };connect(mapStateToProps)

export default compose(withFirestore)(PropertiesSlider);

// firestoreConnect((props) => {
// 	if (props.type === 'agencies' || props.type === 'developers') {
// 		return [
// 			{
// 				collection: 'agencies',
// 				storeAs: props.type,
// 				where: [ [ 'verified', '==', true ] ],
// 				limit: 20
// 			}
// 		];
// 	} else {
// 		return [
// 			{
// 				collection: 'properties',
// 				storeAs: props.type,
// 				where: [ [ 'category.value', '==', props.type ] ],
// 				limit: 12
// 			}
// 		];
// 	}
// })
