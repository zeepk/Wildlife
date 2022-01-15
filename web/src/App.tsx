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
import { FishPage } from 'features/Tracking/pages/FishPage';
import { BugsPage } from 'features/Tracking/pages/BugsPage';
import './App.scss';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { AccountSettings } from 'features/Common/AccountSettings';
import { SeaPage } from 'features/Tracking/pages/SeaPage';
import { ArtPage } from 'features/Tracking/pages/ArtPage';
import { FossilsPage } from 'features/Tracking/pages/FossilsPage';
import { ReactionsPage } from 'features/Tracking/pages/ReactionsPage';
import { MusicPage } from 'features/Tracking/pages/MusicPage';
import { AchievementsPage } from 'features/Tracking/pages/AchievementsPage';
import { VillagersPage } from 'features/Tracking/pages/VillagersPage';
import { SupportPage } from 'features/Common/SupportPage';
import { TotalsPage } from 'features/Tracking/pages/TotalsPage';
import { FriendsPage } from 'features/Common/Friends/FriendsPage';
import { Login } from 'features/Common/Auth/Login';
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
					<Route exact path="/login/:id">
						<Login />
					</Route>
					<Route exact path="/account">
						{isLoggedIn ? <AccountSettings /> : <Redirect to="/" />}
					</Route>
					<Route exact path="/totals">
						{isLoggedIn ? <TotalsPage /> : <Redirect to="/" />}
					</Route>
					<Route exact path="/friends">
						{isLoggedIn ? <FriendsPage /> : <Redirect to="/" />}
					</Route>
					<Route exact path="/fish">
						<FishPage />
					</Route>
					<Route exact path="/bugs">
						<BugsPage />
					</Route>
					<Route exact path="/sea">
						<SeaPage />
					</Route>
					<Route exact path="/art">
						<ArtPage />
					</Route>
					<Route exact path="/fossils">
						<FossilsPage />
					</Route>
					<Route exact path="/reactions">
						<ReactionsPage />
					</Route>
					<Route exact path="/music">
						<MusicPage />
					</Route>
					<Route exact path="/achievements">
						<AchievementsPage />
					</Route>
					<Route exact path="/villagers">
						<VillagersPage />
					</Route>
					<Route exact path="/support">
						<SupportPage />
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
