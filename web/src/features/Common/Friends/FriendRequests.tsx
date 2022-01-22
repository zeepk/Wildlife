import React from 'react';
import 'features/Common/common.scss';
import { useAppSelector } from 'app/hooks';
import { selectAccountIncomingFriendRequests } from '../commonSlice';
import { friendRequestsTitleText } from 'utils/constants';

export function FriendRequests() {
	const requests = useAppSelector(selectAccountIncomingFriendRequests);
	const requestsContent = requests.map((f) => (
		<div
			key={f._id}
			className="container--profile p-d-flex p-ai-center p-jc-between p-p-2 p-mb-2"
		>
			<div className="p-d-flex p-ai-center p-jc-start">
				<img src={f.requestor.avatar} alt={f.requestor.username} />
				<div className="username p-ml-1">{f.requestor.username}</div>
			</div>
			<div />
		</div>
	));

	return (
		<div className="container--requests-list p-d-flex p-flex-column p-jc-start p-px-4 p-pb-2">
			<h1 className="title p-p-0 p-my-0">{friendRequestsTitleText}</h1>
			{requestsContent}
		</div>
	);
}
