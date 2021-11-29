import React from 'react';
import { Button } from 'primereact/button';
import 'features/Common/common.scss';
import { useAuth0 } from '@auth0/auth0-react';

export function SignUpButton() {
	const { logout } = useAuth0();
	return (
		<Button
			label="Sign Up"
			className="p-button-info p-ml-2"
			onClick={() => logout({ returnTo: window.location.origin })}
		/>
	);
}
