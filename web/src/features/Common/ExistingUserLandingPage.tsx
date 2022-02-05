import React from 'react';
import 'features/Common/common.scss';
import { discordUrl } from 'utils/constants';
import { useHistory } from 'react-router-dom';
import { Button } from 'primereact/button';

export function ExistingUserLandingPage() {
	const history = useHistory();
	return (
		<div className="container--existing p-d-flex p-flex-column p-p-6">
			<div className="welcome p-mb-2">Welcome Back!</div>
			<div className="divider p-mb-6" />
			<div className="heading p-mb-2">Recent Additions</div>
			<div className="subheading">Keep Track of your Villagers!</div>
			<div className="text p-mb-4">
				You can now set which villagers are currently living on your island by
				selecting them in
				<a className="content-link" onClick={() => history.push('/account')}>
					{' in your account settings '}
				</a>
				which will allow your friends to see who they can come visit on your
				island. Once you set your current residents, check out the
				<a className="content-link" onClick={() => history.push('/reactions')}>
					{' Reactions page '}
				</a>
				where you can now see which of your villagers might have some new
				Reactions to share with you.
			</div>
			<div className="subdivider p-mb-6" />
			<div className="subheading">Check on your Friends!</div>
			<div className="text p-mb-4">
				So you've added some of your friends... now what? <br /> <br /> Now you
				can see if they have that genuine painting in Redd's shop, or that
				fossil you just dug up but already have. Clicking the
				<i className="pi pi-users icon--friends p-mx-2" />
				button on any item's card will show a list of your friends and whether
				or not they have that item, and you can send it their way to help them
				complete their museum collection!
			</div>
			<div className="subdivider p-mb-6" />
			<div className="subheading">Official v2 Release!</div>
			<div className="text p-mb-4">
				We've officially released version 2! All this means is that the basic
				features for the new version of the app seem to be working well. There
				are lots of new additions coming down the road too, like viewing your
				friends' profiles and what they might be missing in their collections.
				Also, the ability to set which villagers you currently have, and find
				out which reactions they can help you discover. As always, stay tuned
				and check out
				<a className="content-link discord" href={discordUrl}>
					{' the discord '}
				</a>
				if you want some more info. Cheers!
			</div>
			<div className="subdivider p-mb-6" />
			<div className="subheading">Adding Friends</div>
			<div className="text p-mb-4">
				We've recently released the ability to
				<a className="content-link" onClick={() => history.push('/friends')}>
					{' add your friends '}
				</a>
				within the app! You can do this by selecting your profile icon in the
				top corner and selecting Friends from the dropdown. Add your friends to
				(soon) see their progress alongside yours, like seeing if they need that
				piece of art in Redd's shop for example. More to come in the near
				future!
			</div>
			<div className="subdivider p-mb-6" />
			<div className="subheading">Totals</div>
			<div className="text">
				Every curious about your overall progress? Check out the
				<a className="content-link" onClick={() => history.push('/totals')}>
					{' new totals view '}
				</a>
				where you can see your total percentage completion for each category.
				We've also added a bar at the top of the page to show your overall
				progress for all categories combined. Best of luck to you completionists
				and achievement hunters out there!
			</div>
		</div>
	);
}
