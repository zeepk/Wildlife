import React, { FunctionComponent, useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputSwitch } from 'primereact/inputswitch';
import { motion } from 'framer-motion';
import {
	Achievement,
	Art,
	Bug,
	Fish,
	Fossil,
	Music,
	Reaction,
	Sea,
} from 'features/Tracking/trackingTypes';
import { TrackingCard } from './TrackingCard';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
	getAllVillagers,
	selectAccountHideCaught,
	selectAuthIsLoggedIn,
	selectAuthLoading,
	selectCaught,
	selectVillagerPersonalities,
	selectVillagers,
	selectVillagerSpecies,
	updateUserProfile,
} from 'features/Common/commonSlice';
import {
	caughtAllText,
	critterTypes,
	hideCaughtText,
	noResultsText,
} from 'utils/constants';
import { AuthDataUpdateProfile, Villager } from 'features/Common/commonTypes';
import { isNullUndefinedOrWhitespace } from 'utils/helperFunctions';

type props = {
	items: Array<
		Fish | Bug | Sea | Fossil | Music | Art | Reaction | Achievement | Villager
	>;
};

const allOptionSpecies = 'All Species';
const allOptionPersonalities = 'All Personalities';

export const TrackingCards: FunctionComponent<props> = ({ items }) => {
	const dispatch = useAppDispatch();
	const caught = useAppSelector(selectCaught);
	const loading = useAppSelector(selectAuthLoading);
	const villagers = useAppSelector(selectVillagers);
	const species = useAppSelector(selectVillagerSpecies) || [];
	const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);
	const hideCaught = useAppSelector(selectAccountHideCaught);
	const personalities = useAppSelector(selectVillagerPersonalities) || [];
	const [hide, setHide] = useState(false);
	const [searchText, setSearchText] = useState('');
	const [allowSetHide, setAllowSetHide] = useState(true);
	const [selectedSpecies, setSelectedSpecies] = useState(allOptionSpecies);
	const [selectedPersonality, setSelectedPersonality] = useState(
		allOptionPersonalities
	);

	useEffect(() => {
		if (isLoggedIn && !loading && villagers?.length === 0) {
			dispatch(getAllVillagers());
		}
	});
	useEffect(() => {
		if (hideCaught !== undefined) {
			setHide(hideCaught);
		}
	}, [hideCaught]);

	const setHideCaught = async () => {
		if (!allowSetHide) {
			return;
		}
		setAllowSetHide(false);

		setHide(!hide);
		const payload: AuthDataUpdateProfile = {
			authId: 'temp',
			hideCaught: !hideCaught,
		};
		await dispatch(updateUserProfile(payload));
		setAllowSetHide(true);
	};

	const isVillagerPage = items.some(
		i => i.critter_type === critterTypes.VILLAGER
	);
	const isAchievementPage = items.some(
		i => i.critter_type === critterTypes.ACHIEVEMENT
	);

	const showCheckbox = isLoggedIn && !isVillagerPage && !isAchievementPage;
	const showFriendsIcon = isLoggedIn && !isAchievementPage;

	const cards = items
		.filter(i => {
			if (!hide) {
				return true;
			}
			if (i.critter_type === critterTypes.ACHIEVEMENT) {
				const achievement = i as Achievement;
				if (achievement.sequential) {
					return !caught.some(
						c =>
							c.ueid === achievement.ueid && c.value === achievement.tierCount
					);
				} else {
					return (
						new Set(
							caught.filter(c => c.ueid === achievement.ueid).map(c => c.value)
						).size %
							achievement.tierCount !==
						0
					);
				}
			}
			return !caught.some(c => c.ueid === i.ueid);
		})
		.filter(i =>
			i.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
		)
		.filter(i =>
			selectedSpecies !== allOptionSpecies && 'species' in i
				? i.species.toLowerCase() === selectedSpecies.toLowerCase()
				: true
		)
		.filter(i =>
			selectedPersonality !== allOptionPersonalities && 'personality' in i
				? i.personality.toLowerCase() === selectedPersonality.toLowerCase()
				: true
		)
		.map(f => (
			<TrackingCard
				item={f}
				showCheckbox={showCheckbox}
				showFriendsIcon={showFriendsIcon}
				key={f._id}
			/>
		));

	const speciesOptions = [allOptionSpecies, ...species];

	const personalityOptions = [
		allOptionPersonalities,
		...personalities.map(p => ({ label: p, value: p })),
	];

	const villagerFilters = (
		<div className="p-d-flex p-jc-between p-mt-2">
			<Dropdown
				value={selectedSpecies}
				options={speciesOptions}
				onChange={e => setSelectedSpecies(e.value)}
				className="p-mx-1"
			/>
			<Dropdown
				value={selectedPersonality}
				options={personalityOptions}
				onChange={e => setSelectedPersonality(e.value)}
				className="p-mx-1"
			/>
		</div>
	);

	// used for motion animation
	const container = {
		hidden: { opacity: 0.5, y: -50 },
		show: {
			opacity: 1,
			y: 0,
		},
	};

	const noneText =
		selectedPersonality === allOptionPersonalities &&
		selectedSpecies === allOptionSpecies &&
		isNullUndefinedOrWhitespace(searchText)
			? caughtAllText
			: noResultsText;

	return (
		<div className="container--tracking-cards p-d-flex p-flex-column p-ai-center">
			<div className="container--controls p-d-flex p-ai-center p-jc-center">
				<InputText
					className="p-mx-2"
					value={searchText}
					placeholder="search..."
					onChange={e => setSearchText(e.target.value)}
				/>
				{isLoggedIn && (
					<div className="p-d-flex p-flex-column p-ai-center p-mx-2">
						<InputSwitch checked={hide} onChange={e => setHideCaught()} />
						<div>{hideCaughtText}</div>
					</div>
				)}
			</div>
			{isVillagerPage && villagerFilters}
			<motion.div variants={container} initial="hidden" animate="show">
				{cards.length === 0 && (
					<div className="text--all-done p-mt-6 p-d-flex p-ai-center p-jc-center">
						<h3>{noneText}</h3>
					</div>
				)}
				<div className="container--cards">{cards}</div>
			</motion.div>
		</div>
	);
};
