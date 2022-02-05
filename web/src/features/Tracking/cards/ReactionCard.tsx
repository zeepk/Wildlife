import React, { FunctionComponent, useEffect } from 'react';
import { Reaction } from 'features/Tracking/trackingTypes';
import { IconTemplate } from '../common/IconTemplate';
import { Tooltip } from 'primereact/tooltip';
import {
	isNullOrUndefined,
	isNullUndefinedOrWhitespace,
} from 'utils/helperFunctions';
import { useAppSelector } from 'app/hooks';
import {
	selectAccountVillagers,
	selectVillagers,
} from 'features/Common/commonSlice';
import { villagerReactionText } from 'utils/constants';

type props = {
	item: Reaction;
};

export const ReactionCard: FunctionComponent<props> = ({ item }) => {
	const currentVillagerIds = useAppSelector(selectAccountVillagers);
	const villagers = useAppSelector(selectVillagers);
	const isVillagerReaction = item.source.includes(' villagers');
	let villagerSourceText = '';
	let showTooltip = false;

	if (villagers && currentVillagerIds && isVillagerReaction) {
		const currentVillagers = villagers.filter(v =>
			currentVillagerIds.includes(v.ueid)
		);
		const reactionPersonality = item.source
			.split(' villagers')[0]
			?.toLowerCase();
		if (reactionPersonality) {
			const currentVillagersWithReaction = currentVillagers.filter(
				v => v.personality.toLowerCase() === reactionPersonality
			);
			if (currentVillagersWithReaction.length === 1) {
				villagerSourceText = currentVillagersWithReaction[0].name;
			} else if (currentVillagersWithReaction.length === 2) {
				villagerSourceText = `${currentVillagersWithReaction[0].name} or ${currentVillagersWithReaction[1].name}`;
			} else if (currentVillagersWithReaction.length >= 3) {
				showTooltip = true;
				const lastVillagerName =
					currentVillagersWithReaction[currentVillagersWithReaction.length - 1]
						.name;
				const firstVillagers = currentVillagersWithReaction.slice(
					0,
					currentVillagersWithReaction.length - 1
				);
				villagerSourceText = `${firstVillagers
					.map(v => v.name)
					.join(', ')} or ${lastVillagerName}`;
			}
			if (!isNullUndefinedOrWhitespace(villagerSourceText)) {
				villagerSourceText = `${villagerReactionText} ${villagerSourceText}!`;
			}
		}
	}

	const showVillagerText = !isNullUndefinedOrWhitespace(villagerSourceText);

	const notesText = isNullUndefinedOrWhitespace(item.event)
		? item.source_notes
		: item.event;
	return (
		<div className="container--card-content reaction p-d-flex p-flex-column p-ai-center">
			<IconTemplate uri={item.image_uri} altText={item.name} />
			<div className="p-text-center source">{item.source}</div>
			<div className="p-text-center">{notesText}</div>
			{showVillagerText && (
				<div className="villager-info p-mt-2 p-py-2 p-px-4 p-d-flex p-jc-between p-ai-start">
					{showTooltip && (
						<Tooltip position="top" target={`.text-${item.ueid}`}>
							<div className="text--item-tooltip">{villagerSourceText}</div>
						</Tooltip>
					)}
					<i className="pi pi-info-circle p-mr-2 p-mt-2" />
					<div className={`p-text-center villager text-${item.ueid}`}>
						{villagerSourceText}
					</div>
				</div>
			)}
		</div>
	);
};
