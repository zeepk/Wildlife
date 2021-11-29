import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export function Profile() {
	const { user, isAuthenticated, isLoading } = useAuth0();
	if (isLoading) {
		return <div>Loading ...</div>;
	}

	if (isAuthenticated && user) {
		return (
			<div>
				<img src={user.picture} alt={user.name} />
				<h2>{user.name}</h2>
				<p>{user.email}</p>
				<p>{user.sub}</p>
			</div>
		);
	}

	return <h1>login error</h1>;
}
