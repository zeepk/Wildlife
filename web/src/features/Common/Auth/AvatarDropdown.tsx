import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
	getAllVillagers,
	selectVillagers,
	selectAuthLoading,
} from 'features/Common/commonSlice';
import { Dropdown } from 'primereact/dropdown';
import 'features/Common/common.scss';
import { Villager } from '../commonTypes';
import { accountSettingsSelectAVillagerText } from 'utils/constants';
import { isNullOrUndefined } from 'utils/helperFunctions';

type Props = {
	callback: (...args: any[]) => any;
	selectedId: string | undefined;
	index?: number;
};

export default function AvatarDropdown({ callback, selectedId, index }: Props) {
	const dispatch = useAppDispatch();
	const villagers = useAppSelector(selectVillagers);
	const searchableVillagerList = useAppSelector(selectVillagers);
	const loading = useAppSelector(selectAuthLoading);
	const imageOnly = !isNullOrUndefined(index);

	useEffect(() => {
		if (!loading && villagers?.length === 0) {
			dispatch(getAllVillagers());
		}
	});

	const selectedVillager = villagers?.find((v) => v.ueid === selectedId);

	const villagerItemTemplate = (villager?: Villager) => {
		if (!villager) {
			return <div>{accountSettingsSelectAVillagerText}</div>;
		}

		return (
			<div className="container--villager-list-item p-d-flex p-flex-row p-ai-center p-jc-between">
				<img src={villager.image_uri} alt={villager.name} />
				<p>{villager.name}</p>
			</div>
		);
	};

	const imageOnlyTemplate = (villager?: Villager) => {
		if (!villager) {
			return (
				<div className="container--villager-list-item display text">
					{accountSettingsSelectAVillagerText}
				</div>
			);
		}

		return (
			<div className="container--villager-list-item display p-d-flex p-flex-row p-ai-center p-jc-between">
				<img src={villager.image_uri} alt={villager.name} />
			</div>
		);
	};

	if (!searchableVillagerList) {
		return <h3>error loading choices</h3>;
	}

	return (
		<div className="container--avatar-dropdown">
			<Dropdown
				value={selectedVillager}
				options={searchableVillagerList}
				onChange={(e) => callback(e.target.value, index)}
				optionLabel="name"
				filter
				filterBy="name"
				virtualScrollerOptions={{ itemSize: 38 }}
				valueTemplate={imageOnly ? imageOnlyTemplate : villagerItemTemplate}
				itemTemplate={villagerItemTemplate}
			/>
		</div>
	);
}
