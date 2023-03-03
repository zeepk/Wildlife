import React from 'react';
import ReactGA from 'react-ga4';
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
import { EventsPage } from 'features/Common/EventsPage';
import { Login } from 'features/Common/Auth/Login';
function initializeReactGA() {
    console.log(process.env.REACT_APP_GA_TRACKING_ID as string);
    ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID as string);
}
initializeReactGA();

function App() {
    const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Switch>
                    <Route path="/login/:id">
                        <Login />
                    </Route>
                    <Route path="/account">
                        {isLoggedIn ? <AccountSettings /> : <Redirect to="/" />}
                    </Route>
                    <Route path="/totals">
                        {isLoggedIn ? <TotalsPage /> : <Redirect to="/" />}
                    </Route>
                    <Route path="/friends">
                        {isLoggedIn ? <FriendsPage /> : <Redirect to="/" />}
                    </Route>
                    <Route path="/events">
                        <EventsPage />
                    </Route>
                    <Route path="/fish">
                        <FishPage />
                    </Route>
                    <Route path="/bugs">
                        <BugsPage />
                    </Route>
                    <Route path="/sea">
                        <SeaPage />
                    </Route>
                    <Route path="/art">
                        <ArtPage />
                    </Route>
                    <Route path="/fossils">
                        <FossilsPage />
                    </Route>
                    <Route path="/reactions">
                        <ReactionsPage />
                    </Route>
                    <Route path="/music">
                        <MusicPage />
                    </Route>
                    <Route path="/achievements">
                        <AchievementsPage />
                    </Route>
                    <Route path="/villagers">
                        <VillagersPage />
                    </Route>
                    <Route path="/support">
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
