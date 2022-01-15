import React from 'react';
import 'features/Common/common.scss';

import { useParams } from 'react-router-dom';
import { setCookie } from 'utils/helperFunctions';

export function Login() {
	const { id }: any = useParams();

	setCookie('login_jwt', id.toString(), 9);
	console.log('token:');
	console.log(id.toString());
	return (
		<div>
			<h1>woah</h1>
		</div>
	);
}
