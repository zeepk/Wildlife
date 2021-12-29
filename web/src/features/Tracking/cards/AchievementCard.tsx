import React, { FunctionComponent, useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { Checkbox } from 'primereact/checkbox';
import { Achievement } from 'features/Tracking/trackingTypes';
import {
	createUserCaught,
	deleteUserCaught,
	selectAuthIsLoggedIn,
	selectCaught,
} from 'features/Common/commonSlice';

type props = {
	item: Achievement;
};

export const AchievementCard: FunctionComponent<props> = ({ item }) => {
	const dispatch = useAppDispatch();
	const [allowCheck, setAllowCheck] = useState(true);
	const caught = useAppSelector(selectCaught);
	const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);
	const [checked, setChecked] = useState([
		false,
		false,
		false,
		false,
		false,
		false,
	]);

	useEffect(() => {
		setChecked([
			caught.some((c) => c.ueid === item.ueid && c.value === 1),
			caught.some((c) => c.ueid === item.ueid && c.value === 2),
			caught.some((c) => c.ueid === item.ueid && c.value === 3),
			caught.some((c) => c.ueid === item.ueid && c.value === 4),
			caught.some((c) => c.ueid === item.ueid && c.value === 5),
			caught.some((c) => c.ueid === item.ueid && c.value === 6),
		]);
	}, [caught, item.ueid]);

	const updateCaught = async (tier: number) => {
		if (!allowCheck) {
			return;
		}
		setAllowCheck(false);

		const index = tier - 1;
		const currentValue = checked[index];
		const newValue = !currentValue;

		let checkedArray = checked;
		checkedArray[index] = newValue;
		if (item.sequential) {
			checkedArray = checkedArray.map((v, i) =>
				i <= index ? newValue : false
			);
		}
		setChecked([...checkedArray]);
		const payload = {
			ueid: item.ueid,
			critterType: item.critter_type,
			value: tier,
		};
		if (newValue) {
			await dispatch(createUserCaught(payload));
		} else {
			await dispatch(deleteUserCaught(payload));
		}
		setAllowCheck(true);
	};
	const checkboxes = item.tiers.map((t) => (
		<div
			className="p-m-2 p-d-flex p-flex-column p-ai-center"
			key={`${item.ueid}${t.number}`}
		>
			<Checkbox
				checked={checked[t.number - 1]}
				onChange={() => updateCaught(t.number)}
			/>
			{item.sequential && item.tierCount > 1 && (
				<div>{t.requirement.toLocaleString()}</div>
			)}
		</div>
	));
	return (
		<div className="container--card-content achievement p-d-flex p-flex-column p-ai-center">
			<div className="p-text-center">{item.requirements}</div>
			<div className="container--checkboxes p-d-flex p-jc-around p-ai-center p-flex-wrap">
				{isLoggedIn && checkboxes}
			</div>
		</div>
	);
};
