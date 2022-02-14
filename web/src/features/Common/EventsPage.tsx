import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { ViewState } from '@devexpress/dx-react-scheduler';
import {
	Scheduler,
	MonthView,
	Toolbar,
	DateNavigator,
	Appointments,
	TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';

import {
	selectAuthLoading,
	selectEvents,
	getGameEvents,
} from '../Common/commonSlice';
import LoadingIcon from 'features/Common/LoadingIcon';
import 'features/Common/common.scss';
import {
	landingPageExistingUserText,
	landingPageNewUserText,
} from 'utils/constants';

export function EventsPage() {
	const dispatch = useAppDispatch();
	const loading = useAppSelector(selectAuthLoading);
	const events = useAppSelector(selectEvents);
	const currentDate = '2022-02-13';
	const eventsData = events
		.map(e => {
			if (e.activeDateRange.length > 0) {
				return {
					title: e.name,
					startDate: new Date(e.activeDateRange[0]),
					endDate: new Date(e.activeDateRange[1]),
				};
			} else {
				return {
					title: e.name,
					startDate: new Date(e.activeDates[0]),
					endDate: new Date(e.activeDates[0]),
				};
			}
		})
		.filter((e, i) => i > -1 && e !== undefined);

	useEffect(() => {
		if (!loading && events.length === 0) {
			dispatch(getGameEvents());
		}
	}, [dispatch, events.length]);

	if (loading) {
		return <LoadingIcon fullScreen={true} />;
	}
	if (eventsData.length === 0 || eventsData === undefined) {
		return <LoadingIcon fullScreen={true} />;
	}

	const content = (
		<div className="p-d-flex p-flex-column p-ai-center p-pb-4">
			<p className="title">{events.length}</p>
			<Scheduler data={eventsData}>
				<ViewState currentDate={currentDate} />
				<MonthView />
				<Toolbar />
				<DateNavigator />
				<TodayButton />
				<Appointments />
			</Scheduler>
		</div>
	);

	return (
		<div className="container--events-page p-d-flex p-jc-center p-ai-center p-mb-6">
			<div className="content p-mt-6 p-d-flex p-ai-center p-jc-center">
				{content}
			</div>
		</div>
	);
}
