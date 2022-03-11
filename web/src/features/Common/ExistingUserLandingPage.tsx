import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import 'features/Common/common.scss';
import { discordUrl } from 'utils/constants';
import {
	selectAuthLoading,
	getTodayInfo,
	selectDashboard,
} from 'features/Common/commonSlice';
import { useHistory } from 'react-router-dom';
import LoadingIcon from 'features/Common/LoadingIcon';
import { IconTemplate } from 'features/Tracking/common/IconTemplate';
import { DateTime } from 'luxon';
import { Carousel } from 'primereact/carousel';
import { Fish, Bug, Sea } from 'features/Tracking/trackingTypes';

export function ExistingUserLandingPage() {
	const history = useHistory();
	const dispatch = useAppDispatch();
	const loading = useAppSelector(selectAuthLoading);
	const dashboard = useAppSelector(selectDashboard);

	useEffect(() => {
		if (dashboard?.upcomingBirthdays?.length === 0) {
			dispatch(getTodayInfo());
		}
	}, [dispatch, dashboard?.upcomingBirthdays?.length]);

	if (loading || dashboard?.upcomingBirthdays?.length === 0) {
		return <LoadingIcon fullScreen={true} />;
	}
	const todaysBirthdaysNames = dashboard?.todaysBirthdays?.map(v => v.name);

	const responsiveOptions = [
		{
			breakpoint: '1024px',
			numVisible: 3,
			numScroll: 3,
		},
		{
			breakpoint: '768px',
			numVisible: 2,
			numScroll: 2,
		},
		{
			breakpoint: '560px',
			numVisible: 1,
			numScroll: 1,
		},
	];

	const critterTemplate = (c: Fish | Bug | Sea) => (
		<div className="critter p-d-flex p-flex-column p-ai-center p-m-2">
			<IconTemplate uri={c.icon_uri} altText={c.name} />
			{c.name}
		</div>
	);

	return (
		<div className="container--existing p-d-flex p-flex-column p-p-6">
			<div className="welcome p-mb-2">Welcome Back!</div>
			<div className="divider p-mb-6" />
			<div className="container--dashboard p-d-flex p-flex-row p-flex-wrap p-jc-between">
				<div className="dashboard-left p-d-flex p-flex-wrap">
					<div className="dashboard-container container--birthdays">
						<p className="title">Birthdays</p>
						<div className="birthdays p-px-1">
							<div className="row todays p-px-3 p-d-flex p-ai-center p-jc-between">
								<div>Today</div>
								<div className="p-d-flex p-jc-end">
									{dashboard.todaysBirthdays?.length === 0 ? (
										<div>None!</div>
									) : (
										dashboard.todaysBirthdays.map(v => (
											<div
												key={v.name}
												className="villager p-d-flex p-flex-column p-ai-center p-ml-3"
											>
												<IconTemplate uri={v.icon_uri} altText={v.name} />
												<div className="name">{v.name}</div>
											</div>
										))
									)}
								</div>
							</div>
							<div className="row upcoming p-my-4 p-d-flex p-flex-column p-ai-center p-jc-between">
								<div>Upcoming</div>
								<div className="p-d-flex villagers p-pr-3">
									{dashboard.upcomingBirthdays?.length === 0 ? (
										<div>None!</div>
									) : (
										dashboard.upcomingBirthdays
											.filter(v => !todaysBirthdaysNames.includes(v.name))
											.map(v => (
												<div
													key={v._id}
													className="villager p-d-flex p-flex-column p-ai-center p-ml-3"
												>
													<IconTemplate uri={v.icon_uri} altText={v.name} />
													<div className="name">{v.name}</div>
													<div className="name">{v.birthday}</div>
												</div>
											))
									)}
								</div>
							</div>
						</div>
					</div>
					<div className="dashboard-container container--events">
						<p className="title">Today's Events</p>
						<div className="p-d-flex p-flex-column p-jc-end">
							{dashboard.todaysEvents?.length === 0 ? (
								<div>None!</div>
							) : (
								dashboard.todaysEvents.map(e => {
									const endDate = e.endDate
										? `until ${DateTime.fromISO(e.endDate.toString()).toFormat(
												'L/dd'
										  )}`
										: '';
									return (
										<div
											key={e.name}
											className="row event p-d-flex p-flex-row p-jc-between p-py-3 p-ai-center p-mb-3"
										>
											<div className="name">{e.name}</div>
											<div className="date">{endDate}</div>
										</div>
									);
								})
							)}
						</div>
					</div>
					<div className="dashboard-container container--critters">
						<p className="title">Available Critters</p>
						<Carousel
							value={dashboard.availableCritters}
							itemTemplate={c => critterTemplate(c)}
							numVisible={3}
							numScroll={1}
							responsiveOptions={responsiveOptions}
						/>
					</div>
				</div>
				<div className="dashboard-right p-ml-2">
					<div className="dashboard-container container--notes p-px-3">
						<p className="title p-mb-2">Recent Additions</p>
						<div className="subdivider p-mb-6" />
						<div className="subheading">Keep Track of your Villagers!</div>
						<div className="text p-mb-4">
							You can now set which villagers are currently living on your
							island by selecting them in
							<a
								className="content-link"
								onClick={() => history.push('/account')}
							>
								{' in your account settings '}
							</a>
							which will allow your friends to see who they can come visit on
							your island. Once you set your current residents, check out the
							<a
								className="content-link"
								onClick={() => history.push('/reactions')}
							>
								{' Reactions page '}
							</a>
							where you can now see which of your villagers might have some new
							Reactions to share with you.
						</div>
						<div className="subdivider p-mb-6" />
						<div className="subheading">Check on your Friends!</div>
						<div className="text p-mb-4">
							So you've added some of your friends... now what? <br /> <br />{' '}
							Now you can see if they have that genuine painting in Redd's shop,
							or that fossil you just dug up but already have. Clicking the
							<i className="pi pi-users icon--friends p-mx-2" />
							button on any item's card will show a list of your friends and
							whether or not they have that item, and you can send it their way
							to help them complete their museum collection!
						</div>
						<div className="subdivider p-mb-6" />
						<div className="subheading">Official v2 Release!</div>
						<div className="text p-mb-4">
							We've officially released version 2! All this means is that the
							basic features for the new version of the app seem to be working
							well. There are lots of new additions coming down the road too,
							like viewing your friends' profiles and what they might be missing
							in their collections. Also, the ability to set which villagers you
							currently have, and find out which reactions they can help you
							discover. As always, stay tuned and check out
							<a className="content-link discord" href={discordUrl}>
								{' the discord '}
							</a>
							if you want some more info. Cheers!
						</div>
						<div className="subdivider p-mb-6" />
						<div className="subheading">Adding Friends</div>
						<div className="text p-mb-4">
							We've recently released the ability to
							<a
								className="content-link"
								onClick={() => history.push('/friends')}
							>
								{' add your friends '}
							</a>
							within the app! You can do this by selecting your profile icon in
							the top corner and selecting Friends from the dropdown. Add your
							friends to (soon) see their progress alongside yours, like seeing
							if they need that piece of art in Redd's shop for example. More to
							come in the near future!
						</div>
						<div className="subdivider p-mb-6" />
						<div className="subheading">Totals</div>
						<div className="text">
							Every curious about your overall progress? Check out the
							<a
								className="content-link"
								onClick={() => history.push('/totals')}
							>
								{' new totals view '}
							</a>
							where you can see your total percentage completion for each
							category. We've also added a bar at the top of the page to show
							your overall progress for all categories combined. Best of luck to
							you completionists and achievement hunters out there!
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
