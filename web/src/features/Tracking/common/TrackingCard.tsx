import React, { FunctionComponent, useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { Checkbox } from 'primereact/checkbox';
import { Tooltip } from 'primereact/tooltip';
import { Card } from 'primereact/card';
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
import {
	selectCaughtUeids,
	createUserCaught,
	deleteUserCaught,
} from 'features/Common/commonSlice';
import { critterTypes } from 'utils/constants';
import { FishCard } from '../cards/FishCard';
import { BugCard } from '../cards/BugCard';
import { ArtCard } from '../cards/ArtCard';
import { SeaCard } from '../cards/SeaCard';
import { FossilCard } from '../cards/FossilCard';
import { ReactionCard } from '../cards/ReactionCard';
import { MusicCard } from '../cards/MusicCard';
import { AchievementCard } from '../cards/AchievementCard';
import { Villager } from 'features/Common/commonTypes';
import { VillagerCard } from '../cards/VillagerCard';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { FriendsCaughtModalContent } from './FriendsCaughtModalContent';

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
	showCheckbox: boolean;
	showFriendsIcon: boolean;
};

export const TrackingCard: FunctionComponent<props> = ({
	item,
	showCheckbox,
	showFriendsIcon,
}) => {
	const dispatch = useAppDispatch();
	const [allowCheck, setAllowCheck] = useState(true);
	const [modalOpen, setModalOpen] = useState(false);
	const caught = useAppSelector(selectCaughtUeids);
	const isCaught = caught.includes(item.ueid);
	const [checked, setChecked] = useState(isCaught);

	useEffect(() => {
		setChecked(isCaught);
	}, [isCaught]);

	const updateCaught = async () => {
		if (!allowCheck) {
			return;
		}
		setAllowCheck(false);

		if (checked) {
			setChecked(false);
			await dispatch(deleteUserCaught({ ueid: item.ueid }));
			setAllowCheck(true);
		} else {
			const payload = {
				ueid: item.ueid,
				critterType: item.critter_type,
			};
			setChecked(true);
			await dispatch(createUserCaught(payload));
			setAllowCheck(true);
		}
	};

	const header = (
		<div className="header p-mx-2 p-py-0 p-d-flex p-ai-center p-jc-between">
			<Tooltip position="top" target={`.header-${item.ueid}`}>
				<div className="text--item-tooltip">{item.name}</div>
			</Tooltip>
			<div className={`header-${item.ueid} text p-py-0`}>{item.name}</div>
			<div className="p-d-flex p-ai-center">
				{showFriendsIcon && (
					<Button
						icon="pi pi-users"
						className="btn--friends p-button-link"
						onClick={() => setModalOpen(true)}
					/>
				)}
				{showCheckbox && (
					<Checkbox
						className="p-ml-3"
						checked={checked}
						onChange={() => updateCaught()}
					/>
				)}
			</div>
		</div>
	);

	let body = <div />;
	switch (item.critter_type) {
		case critterTypes.FISH:
			body = <FishCard item={item as Fish} />;
			break;
		case critterTypes.BUG:
			body = <BugCard item={item as Bug} />;
			break;
		case critterTypes.SEA:
			body = <SeaCard item={item as Sea} />;
			break;
		case critterTypes.ART:
			body = <ArtCard item={item as Art} />;
			break;
		case critterTypes.FOSSIL:
			body = <FossilCard item={item as Fossil} />;
			break;
		case critterTypes.REACTION:
			body = <ReactionCard item={item as Reaction} />;
			break;
		case critterTypes.SONG:
			body = <MusicCard item={item as Music} />;
			break;
		case critterTypes.ACHIEVEMENT:
			body = <AchievementCard item={item as Achievement} />;
			break;
		case critterTypes.VILLAGER:
			body = <VillagerCard item={item as Villager} />;
			break;
		default:
			body = <div />;
	}

	return (
		<Card className="p-m-3" header={header}>
			<Dialog
				className="modal--friends-progress"
				header={item.name}
				visible={modalOpen}
				closeOnEscape={true}
				closable={true}
				onHide={() => setModalOpen(false)}
			>
				<FriendsCaughtModalContent
					item={item}
					isVillager={item.critter_type === critterTypes.VILLAGER}
				/>
			</Dialog>
			{body}
		</Card>
	);
};
