import React from 'react';
import ReactGA from 'react-ga';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LandingPage } from 'features/Common/LandingPage';
import { Footer } from 'features/Common/Footer';
import './App.scss';
function initializeReactGA() {
	ReactGA.initialize('google analytics code');
	ReactGA.pageview('/homepage');
}
initializeReactGA();

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
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
