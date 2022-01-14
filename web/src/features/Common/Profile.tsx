import React from 'react';

export function Profile() {
	const isLoading = null;
	const isAuthenticated = null;
	const user = {
		user: '',
		picture: '',
		name: '',
		email: '',
		sub: '',
	};
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
