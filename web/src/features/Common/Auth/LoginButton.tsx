import React from 'react';
import { Button } from 'primereact/button';
import 'features/Common/common.scss';
import { useAuth0 } from '@auth0/auth0-react';

export function LoginButton() {
	const { loginWithRedirect } = useAuth0();
	return (
		// <Button
		// 	label="Log In / Sign up"
		// 	onClick={() =>
		// 		loginWithRedirect({
		// 			prompt: 'select_account',
		// 		})
		// 	}
		// />
		<a href="http://localhost:8000/login" className="href">
			login
		</a>
	);
}
