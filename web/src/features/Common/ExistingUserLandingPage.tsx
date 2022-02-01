import React from 'react';
import 'features/Common/common.scss';

export function ExistingUserLandingPage() {
	return (
		<div className="container--existing p-d-flex p-flex-column p-p-6">
			<div className="welcome p-mb-2">Welcome Back!</div>
			<div className="divider p-mb-6" />
			<div className="heading p-mb-2">Recent Additions</div>
			<div className="subheading">Adding Friends!</div>
			<div className="text p-mb-4">
				We've recently released the ability to add your friends within the app!
				You can do this by selecting your profile icon in the top corner and
				selecting Friends from the dropdown. Add your friends to (soon) see
				their progress alongside yours, like seeing if they need that piece of
				art in Redd's shop for example. More to come in the near future!
			</div>
			<div className="subheading">Totals</div>
			<div className="text">
				Every curious about your overall progress? Check out the new view by
				clicking your profile icon and then selecting Totals, where you can see
				your total percentage completion for each category. We've also added a
				bar at the top of the page to show your overall progress for all
				categories combined. Best of luck to you completionists and achievement
				hunters out there!
			</div>
		</div>
	);
}
