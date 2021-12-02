import React from 'react';
import ReactGA from 'react-ga';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LandingPage } from 'features/Common/LandingPage';
import { Footer } from 'features/Common/Footer';
import { Navbar } from 'features/Common/Navbar';
import { FishPage } from 'features/Tracking/fish/FishPage';
import './App.scss';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
function initializeReactGA() {
	ReactGA.initialize('google analytics code');
	ReactGA.pageview('/homepage');
}
initializeReactGA();

function App() {
	return (
		<div className="App">
			<Router>
				<Navbar />
				<Switch>
					<Route exact path="/fish">
						<FishPage />
					</Route>
					<Route path="/">
						<LandingPage />
					</Route>
				</Switch>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
