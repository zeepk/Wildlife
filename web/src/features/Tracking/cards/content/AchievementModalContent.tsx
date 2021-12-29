import React, { FunctionComponent } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Achievement } from 'features/Tracking/trackingTypes';
import { achievementModalUnlockedText } from 'utils/constants';

type props = {
	achievement: Achievement;
};

export const AchievementModalContent: FunctionComponent<props> = ({
	achievement,
}) => {
	return (
		<div className="container--achievement-modal">
			<div className="text--reqs p-mb-1">{achievement.requirements}</div>
			<div className="text--desc p-mb-4">"{achievement.description}"</div>
			{achievement.tierCount === 1 ? (
				<div>
					<div className="text--unlocked">{achievementModalUnlockedText}</div>
					<div className="text--desc">
						{achievement.tiers[0].modifier} / {achievement.tiers[0].noun}
					</div>
				</div>
			) : (
				<DataTable value={achievement.tiers} responsiveLayout="scroll">
					<Column field="number" header="Tier"></Column>
					<Column field="requirement" header="Required"></Column>
					<Column field="modifier" header="Modifier"></Column>
					<Column field="noun" header="Noun"></Column>
				</DataTable>
			)}
		</div>
	);
};
