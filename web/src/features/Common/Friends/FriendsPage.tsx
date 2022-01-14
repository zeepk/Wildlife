import React, { useRef } from 'react';
import { Toast } from 'primereact/toast';

import { friendsTitleText } from 'utils/constants';
import 'features/Common/common.scss';
import { AddFriend } from './AddFriend';

export function FriendsPage() {
	const toast = useRef<Toast>(null);
	return (
		<div className="container--friends-page p-d-flex p-jc-center">
			<Toast ref={toast} />
			<div className="container--friends p-mt-6 p-px-4">
				<h1 className="title">{friendsTitleText}</h1>
				<div className="container--friend-features p-d-flex p-jc-between">
					<AddFriend />
					<AddFriend />
				</div>
			</div>
		</div>
	);
}
