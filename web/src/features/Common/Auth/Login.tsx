import React from 'react';
import 'features/Common/common.scss';

import { useParams } from 'react-router-dom';

export function Login() {
	const { id }: any = useParams();

	function setCookie(name: string, value: string, days: number) {
		var expires = '';
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
			expires = '; expires=' + date.toUTCString();
		}
		document.cookie = name + '=' + (value || '') + expires + '; path=/';
	}
	setCookie('login_jwt', id.toString(), 9);
	setCookie('woah', 'heya', 9);
	return (
		<div>
			<h1>woah</h1>
		</div>
	);
}
