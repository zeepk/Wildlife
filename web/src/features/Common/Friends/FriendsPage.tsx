import React from 'react';
import 'features/Common/common.scss';
import { friendsTitleText } from 'utils/constants';

export function FriendsPage() {
	return (
		<div className="container--friends p-d-flex p-jc-center">
			<h1>{friendsTitleText}</h1>
		</div>
	);
}
