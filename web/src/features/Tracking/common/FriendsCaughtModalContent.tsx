import React, { FunctionComponent, useEffect, useState } from 'react';
import { Tag } from 'primereact/tag';
import {
	Fish,
	Bug,
	Sea,
	Fossil,
	Art,
	Music,
	Reaction,
	Achievement,
} from 'features/Tracking/trackingTypes';
import { Villager } from 'features/Common/commonTypes';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getAllFriendsCaught } from '../trackingSlice';
import { selectAccountFriends } from 'features/Common/commonSlice';
import LoadingIcon from 'features/Common/LoadingIcon';
import { caughtText, caughtTextNot, caughtTextVillager } from 'utils/constants';
import { useHistory } from 'react-router-dom';
type props = {
	item:
		| Fish
		| Bug
		| Sea
		| Fossil
		| Art
		| Music
		| Reaction
		| Achievement
		| Villager;
	isVillager: boolean;
};

export const FriendsCaughtModalContent: FunctionComponent<props> = ({
	item,
	isVillager,
}) => {
	const history = useHistory();
	const [isLoading, setIsLoading] = useState(true);
	const [friendsCaught, setFriendsCaught] = useState<string[]>([]);
	const dispatch = useAppDispatch();
	const friends = useAppSelector(selectAccountFriends);
	useEffect(() => {
		setIsLoading(true);
		if (isVillager) {
			const friendsWithVillager = friends
				.filter((f) => f.villagers.includes(item.ueid))
				.map((f) => f.username);
			setFriendsCaught(friendsWithVillager);
			setIsLoading(false);
			return;
		}
		dispatch(getAllFriendsCaught(item.ueid)).then((resp: any) => {
			const data = resp.payload.data.data;
			setFriendsCaught(data);
			setIsLoading(false);
		});
	}, [item.ueid]);

	if (isLoading) {
		return (
			<div className="p-pt-6">
				<LoadingIcon fullScreen={false} />
			</div>
		);
	}

	if (friends.length === 0) {
		return (
			<div className="p-d-flex p-flex-column p-jc-center p-ai-center">
				<div className="p-py-3">No friends added :(</div>
				<div className="p-pb-6">
					<a className="content-link" onClick={() => history.push('/friends')}>
						{'Head over here '}
					</a>
					to search for your pals!
				</div>
			</div>
		);
	}

	return (
		<div>
			{friends.map((f) => {
				const isCaught = friendsCaught.includes(f.username);
				const severity = isCaught ? 'success' : 'warning';
				const value = isCaught
					? isVillager
						? caughtTextVillager
						: caughtText
					: caughtTextNot;
				return (
					<div
						key={f.username}
						className="container--profile p-d-flex p-ai-center p-jc-between p-p-3 p-mb-2"
					>
						<div className="p-d-flex p-ai-center p-jc-start">
							<img src={f.avatar} alt={f.username} />
							<div className="username p-ml-1">{f.username}</div>
						</div>
						<Tag className="mr-2" severity={severity} value={value} />
					</div>
				);
			})}
		</div>
	);
};
