import React, { Component } from 'react';
import Slider from 'react-slick';
import './Jumbotron.scss';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';

export class Jumbotron extends Component {
	constructor() {
		super();
		this.state = {
			index: 0,
			data: null
		};
		this.index = this.index.bind(this);
	}
	componentDidMount() {
		Axios.get('https://flatrima.herokuapp.com/api/properties?filter[category]=apartment&filter[priority]=5&sort=-created_at')
			.then((res) => {
				console.log('jump', res);

				this.setState({
					data: res.data.data
				});
			})
			.catch((e) => console.log(e));
	}
	index(current) {
		this.setState(() => {
			return {
				index: current
			};
		});
	}
	render() {
		var settings = {
			dots: false,
			arrows: false,
			infinite: true,
			fade: true,
			speed: 500,
			autoplay: true,
			autoplaySpeed: 4000,
			slidesToShow: 1,
			slidesToScroll: 1,
			pauseOnFocus: false,
			pauseOnHover: false,
			//beforeChange: (prev, next) => this.setState({ index: next })
			afterChange: (current) => {
				this.setState({ index: current });
			}
		};
		const { data } = this.state;
		var slides;
		var infos;
		if (data === null) {
			slides = <div>Loading...</div>;
		} else if (data.length === 0) {
			slides = <div>Empty</div>;
		} else {
			slides = data.map((data) => {
				const images = JSON.parse(data.images);
				return (
					<div key={'img' + data.id}>
						<div
							className="slide2"
							style={{
								backgroundImage: 'url(' + images[0] + ')'
							}}
						/>
					</div>
				);
			});
			infos = data.map((data, index) => {
				return (
					<div
						key={data.id}
						className="JumbotronModal"
						style={{ display: this.state.index === index ? 'block' : 'none' }}
					>
						<h3>{data.districtGe}</h3>
						<hr />
						<h6>{data.street}</h6>
						<p>{data.textGe ? data.textGe.substring(0, 80) : ''}</p>
						<div className="ModalBottom">
							<h5>
								<CurrencyFormat
									value={data.price}
									displayType={'text'}
									thousandSeparator={true}
									prefix={data.currency === 'USD' ? '$' : '₾'}
								/>
							</h5>

							<Link to={'/property/' + data.id}>
								<button className="btn btn-primary">სრულად</button>
							</Link>
						</div>
					</div>
				);
			});
		}
		return (
			<div className="Jumbotron">
				<Slider {...settings}>
					{slides}

					{/* <img className="slide2" src="images/BG.jpg" alt="" />
					<img className="slide2" src="images/BG2.jpg" alt="" /> */}
				</Slider>
				{infos}
			</div>
		);
	}
}

export default Jumbotron;
