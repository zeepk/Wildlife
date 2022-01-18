import React from 'react';
import 'features/Common/common.scss';

import { Redirect, useParams } from 'react-router-dom';
import { isNullUndefinedOrWhitespace, setCookie } from 'utils/helperFunctions';

export function Login() {
	const { id }: any = useParams();
	if (!isNullUndefinedOrWhitespace(id)) {
		const jwt = id.toString();
		setCookie('login_jwt', jwt, 9);
		console.log(`setting jwt cookie: ${jwt.substring(0, 10)}`);
	} else {
		console.log('login url recieved null jwt');
	}

	return <Redirect to="/" />;
}
