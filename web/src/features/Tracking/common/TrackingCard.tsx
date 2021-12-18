import React, { FunctionComponent, useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { Checkbox } from 'primereact/checkbox';
import { Card } from 'primereact/card';
import {
	Fish,
	Bug,
	Sea,
	Fossil,
	Art,
	Music,
	Reaction,
} from 'features/Tracking/trackingTypes';
import {
	selectCaught,
	createUserCaught,
	deleteUserCaught,
} from 'features/Common/commonSlice';
import { critterTypes } from 'utils/constants';
import { FishCard } from '../cards/FishCard';
import { BugCard } from '../cards/BugCard';
import { ArtCard } from '../cards/ArtCard';
import { SeaCard } from '../cards/SeaCard';

type props = {
	item: Fish | Bug | Sea | Fossil | Art | Music | Reaction;
	showCheckbox: boolean;
};

export const TrackingCard: FunctionComponent<props> = ({
	item,
	showCheckbox,
}) => {
	const dispatch = useAppDispatch();
	const [allowCheck, setAllowCheck] = useState(true);
	const caught = useAppSelector(selectCaught);
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
			await dispatch(deleteUserCaught(item.ueid));
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
			<div className="p-py-0">{item.name}</div>
			{showCheckbox && (
				<Checkbox checked={checked} onChange={() => updateCaught()} />
			)}
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
		default:
			body = <div />;
	}

	return (
		<Card className="p-m-3" header={header}>
			{body}
		</Card>
	);
};
