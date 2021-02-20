import React, { Component } from 'react';
import './App.scss';
import Header from './Layouts/Header';
import Footer from './Layouts/Footer';
import Home from './Pages/Home';
import Properties from './Pages/Properties';
import Agencies from './Pages/Agencies';
import Developers from './Pages/Developers';
import Property from './Pages/Property';
import Registration from './Pages/Registration';
import CreateProperty from './Pages/CreateProperty';
import Dashboard from './Pages/Dashboard';

import { BrowserRouter as Router, Route, HashRouter } from 'react-router-dom';

class App extends Component {
	constructor() {
		super();
		this.state = { screenWidth: null };
		this.resize = this.resize.bind(this);
	}
	componentDidMount() {
		window.addEventListener('resize', this.resize.bind(this));
		this.resize();
	}

	resize() {
		this.setState({ screenWidth: window.innerWidth });
	}
	render() {
		return (
			<div className="App">
				<HashRouter>
					{/* <Header screenWidth={this.state.screenWidth} /> */}
					<Route
						path="/"
						render={(routeProps) => <Header {...routeProps} screenWidth={this.state.screenWidth} />}
					/>
					<Route
						path="/"
						exact
						render={(routeProps) => <Home {...routeProps} screenWidth={this.state.screenWidth} />}
					/>
					<Route
						path="/products"
						render={(routeProps) => <Properties {...routeProps} screenWidth={this.state.screenWidth} />}
					/>
					<Route
						path="/property/:property_id"
						render={(routeProps) => <Property {...routeProps} screenWidth={this.state.screenWidth} />}
					/>
					<Route path="/agencies" exact component={() => <Agencies screenWidth={this.state.screenWidth} />} />

					<Route
						path="/agency/:agency_id"
						render={(routeProps) => <Properties {...routeProps} screenWidth={this.state.screenWidth} />}
					/>
					<Route
						path="/agent/:agent_id"
						render={(routeProps) => <Properties {...routeProps} screenWidth={this.state.screenWidth} />}
					/>
					{/* <Route
							path="/dashboard"
							render={(routeProps) => <Dashboard {...routeProps} screenWidth={this.state.screenWidth} />}
						/> */}
					{/* 
					<Route path="/developers" component={() => <Developers screenWidth={this.state.screenWidth} />} /> */}

					<Route path="/registration" component={Registration} screenWidth={this.state.screenWidth} />

					<Route path="/create" component={CreateProperty} screenWidth={this.state.screenWidth} />
					<Route
						path="/edit/:property_id"
						render={(routeProps) => <CreateProperty {...routeProps} screenWidth={this.state.screenWidth} />}
					/>
					<Footer />
				</HashRouter>
			</div>
		);
	}
}

export default App;
