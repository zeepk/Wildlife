import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import 'features/Common/common.scss';
import { hemisphereChoices } from 'utils/constants';

type Props = {
	callback: Function;
	selectedHemisphereId: number | undefined;
};

export default function HemisphereDropdown({
	callback,
	selectedHemisphereId,
}: Props) {
	const selectedHemisphere = hemisphereChoices.find(
		(h) => h.id === selectedHemisphereId,
	);

	return (
		<div className="container--avatar-dropdown">
			<Dropdown
				value={selectedHemisphere}
				options={hemisphereChoices}
				onChange={(e) => callback(e.target.value.id)}
				optionLabel="text"
			/>
		</div>
	);
}
