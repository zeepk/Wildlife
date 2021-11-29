import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
	<Auth0Provider
		domain={process.env.REACT_APP_AUTH0_DOMAIN || ''}
		clientId={process.env.REACT_APP_AUTH0_CLIENT_ID || ''}
		redirectUri="http://localhost:3000"
	>
		<React.StrictMode>
			<Provider store={store}>
				<App />
			</Provider>
		</React.StrictMode>
	</Auth0Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
