import React, { useRef } from 'react';
import { Toast } from 'primereact/toast';

import { friendsTitleText } from 'utils/constants';
import 'features/Common/common.scss';
import { AddFriend } from './AddFriend';
import { FriendsList } from './FriendsList';
import { FriendRequests } from './FriendRequests';

export function FriendsPage() {
	const toast = useRef<Toast>(null);
	return (
		<div className="container--friends-page p-d-flex p-jc-center p-mb-6">
			<Toast ref={toast} />
			<div className="container--friends p-mt-6 p-px-4 p-pb-4">
				<h1 className="title">{friendsTitleText}</h1>
				<div className="container--friend-features p-d-flex p-jc-center p-jc-md-between p-flex-wrap p-flex-sm-row p-flex-column">
					<AddFriend />
					<FriendsList />
					<FriendRequests />
				</div>
			</div>
		</div>
	);
}
