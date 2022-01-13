import React from 'react';
import { Button } from 'primereact/button';
import 'features/Common/common.scss';

export function LoginButton() {
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
