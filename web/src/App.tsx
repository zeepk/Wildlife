import React from 'react';
import ReactGA from 'react-ga';
import { useAppSelector } from './app/hooks';
import { selectAuthIsLoggedIn } from 'features/Common/commonSlice';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import { LandingPage } from 'features/Common/LandingPage';
import { Footer } from 'features/Common/Footer';
import { Navbar } from 'features/Common/Navbar';
import { FishPage } from 'features/Tracking/fish/FishPage';
import './App.scss';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { AccountSettings } from 'features/Common/AccountSettings';
function initializeReactGA() {
	console.warn('google analytics code invalid');
	ReactGA.initialize('google analytics code');
	ReactGA.pageview('/homepage');
}
initializeReactGA();

function App() {
	const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);
	return (
		<div className="App">
			<Router>
				<Navbar />
				<Switch>
					<Route exact path="/account">
						{isLoggedIn ? <AccountSettings /> : <Redirect to="/" />}
					</Route>
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