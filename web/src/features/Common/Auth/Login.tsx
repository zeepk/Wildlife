import React from 'react';
import 'features/Common/common.scss';

import { Redirect, useParams } from 'react-router-dom';
import { setCookie } from 'utils/helperFunctions';

export function Login() {
	const { id }: any = useParams();

	setCookie('login_jwt', id.toString(), 9);

	return <Redirect to="/" />;
}
