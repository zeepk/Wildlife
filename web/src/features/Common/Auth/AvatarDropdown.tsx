import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getAllVillagers, selectVillagers } from 'features/Common/commonSlice';
import { Dropdown } from 'primereact/dropdown';
import 'features/Common/common.scss';
import { Villager } from '../commonTypes';
import { accountSettingsSelectAVillagerText } from 'utils/constants';

type Props = {
	callback: Function;
	selectedId: string | undefined;
};

export default function AvatarDropdown({ callback, selectedId }: Props) {
	const dispatch = useAppDispatch();
	const villagers = useAppSelector(selectVillagers);

	useEffect(() => {
		if (villagers?.length === 0) {
			dispatch(getAllVillagers());
		}
	}, []);

	const selectedVillager = villagers?.find((v) => v.euid === selectedId);

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

	if (!villagers) {
		return <h3>error loading choices</h3>;
	}

	return (
		<div className="container--avatar-dropdown">
			<Dropdown
				value={selectedVillager}
				options={villagers}
				onChange={(e) => callback(e.target.value)}
				optionLabel="name"
				filter
				filterBy="name"
				virtualScrollerOptions={{ itemSize: 38 }}
				valueTemplate={villagerItemTemplate}
				itemTemplate={villagerItemTemplate}
			/>
		</div>
	);
}
