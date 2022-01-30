import React from 'react';
import 'features/Common/common.scss';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { Button } from 'primereact/button';
import {
	respondToUserFriendRequest,
	selectAccountIncomingFriendRequests,
} from '../commonSlice';
import { friendRequestsTitleText } from 'utils/constants';

export function FriendRequests() {
	const dispatch = useAppDispatch();
	const requests = useAppSelector(selectAccountIncomingFriendRequests);
	const handleFriendRequest = (requestId: string, accepted: boolean) => {
		dispatch(respondToUserFriendRequest({ requestId, accepted }));
	};

	const requestsContent = requests.map((f) => (
		<div
			key={f._id}
			className="container--profile p-d-flex p-ai-center p-jc-between p-p-2 p-mb-2"
		>
			<div className="p-d-flex p-ai-center p-jc-start">
				<img src={f.requestor.avatar} alt={f.requestor.username} />
				<div className="username p-ml-1">{f.requestor.username}</div>
			</div>
			<div>
				<Button
					icon="pi pi-check"
					className="p-button-rounded p-mr-2"
					onClick={() => handleFriendRequest(f._id, true)}
				/>
				<Button
					icon="pi pi-times"
					className="p-button-rounded p-button-danger"
					onClick={() => handleFriendRequest(f._id, false)}
				/>
			</div>
		</div>
	));

	return (
		<div className="container--requests-list p-d-flex p-flex-column p-jc-start p-px-4 p-pb-2">
			<h1 className="title p-p-0 p-my-0">{friendRequestsTitleText}</h1>
			{requestsContent}
		</div>
	);
}
