import React, { FunctionComponent, useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { Card } from 'primereact/card';
import { Checkbox } from 'primereact/checkbox';

import { Fish, Bug, Sea } from 'features/Tracking/trackingTypes';
import { IconTemplate } from './IconTemplate';
import {
	selectAccountHemisphere,
	selectCaught,
	createUserCaught,
	deleteUserCaught,
} from 'features/Common/commonSlice';
import { hemispheres } from 'utils/constants';

type props = {
	item: Fish | Bug | Sea;
	showCheckbox: boolean;
};

export const TrackingCard: FunctionComponent<props> = ({
	item,
	showCheckbox,
}) => {
	const dispatch = useAppDispatch();
	const [allowCheck, setAllowCheck] = useState(true);
	const hemisphere = useAppSelector(selectAccountHemisphere);
	const caught = useAppSelector(selectCaught);
	const isCaught = caught.includes(item.ueid);
	const [checked, setChecked] = useState(isCaught);

	function isFish(critter: any): critter is Fish {
		return (critter as Fish).vision !== undefined;
	}

	useEffect(() => {
		setChecked(isCaught);
	}, [isCaught]);

	const months =
		hemisphere === hemispheres.SOUTHERN
			? item.southernMonths
			: item.northernMonths;

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

	const body = (
		<div className="p-d-flex p-ai-center p-jc-between p-px-2">
			<div className="container--icon">
				<IconTemplate uri={item.icon_uri} altText={item.name} />
			</div>
			{months}
			{isFish(item) && item.vision}
		</div>
	);

	return (
		<Card className="p-m-3" header={header}>
			{body}
		</Card>
	);
};
