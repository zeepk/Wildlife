import React from 'react';
import { Button } from 'primereact/button';
import 'features/Common/common.scss';
import { loginUrl } from 'utils/constants';

export function LoginButton() {
	return (
		<Button
			label="Log In / Sign up"
			onClick={() => (window.location.href = loginUrl)}
		/>
	);
}
