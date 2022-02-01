import React from 'react';
import 'features/Common/common.scss';
import { discordUrl } from 'utils/constants';
import { useHistory } from 'react-router-dom';

export function ExistingUserLandingPage() {
	const history = useHistory();
	return (
		<div className="container--existing p-d-flex p-flex-column p-p-6">
			<div className="welcome p-mb-2">Welcome Back!</div>
			<div className="divider p-mb-6" />
			<div className="heading p-mb-2">Recent Additions</div>
			<div className="subheading">Official v1 Release!</div>
			<div className="text p-mb-4">
				We've officially released version 1! All this means is that the basic
				features for the app seem to be working well. There are lots of new
				additions coming down the road too, like viewing your friends' profiles
				and what they might be missing in their collections. Also, the ability
				to set which villagers you currently have, and find out which reactions
				they can help you discover. As always, stay tuned and check out
				<a className="content-link discord" href={discordUrl}>
					{' the discord '}
				</a>
				if you want some more info. Cheers!
			</div>
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
