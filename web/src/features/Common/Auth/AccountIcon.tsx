import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from 'app/hooks';
import {
	selectAccountUsername,
	selectAccountAvatar,
	selectAccountIncomingFriendRequests,
} from 'features/Common/commonSlice';
import { isNullUndefinedOrWhitespace, setCookie } from 'utils/helperFunctions';

import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import 'features/Common/common.scss';
import { logoutUrl } from 'utils/constants';

export function AccountIcon() {
	const history = useHistory();
	const username = useAppSelector(selectAccountUsername);
	const avatar = useAppSelector(selectAccountAvatar);
	const friendRequests = useAppSelector(selectAccountIncomingFriendRequests);

	const handleLogout = () => {
		setCookie('login_jwt', '', 99);
		window.location.href = logoutUrl;
	};

	const badge = friendRequests?.length > 0 && (
		<Badge className="notif-badge" value={friendRequests.length} />
	);
	const menuItems = [
		{
			label: 'Account',
			icon: 'pi pi-user-edit',
			command: () => history.push('/account'),
		},
		{
			label: 'Friends',
			icon: 'pi pi-users',
			command: () => history.push('/friends'),
			template: (item: any, options: any) => {
				return (
					<a
						className={`${options.className} p-d-flex p-jc-between p-ai-center`}
						target={item.target}
						onClick={options.onClick}
						href={item.target}
					>
						<span>
							<span className="pi pi-users p-mr-2"></span>
							<span className={options.labelClassName}>{item.label}</span>
						</span>
						{badge}
					</a>
				);
			},
		},
		{
			label: 'Your Totals',
			icon: 'pi pi-chart-bar',
		},
		{ separator: true },
		{
			label: 'About',
			icon: 'pi pi-info-circle',
			command: () => history.push('/support'),
		},
		{
			label: 'Logout',
			icon: 'pi pi-sign-out',
			command: () => handleLogout(),
		},
	];

	if (
		isNullUndefinedOrWhitespace(username) ||
		isNullUndefinedOrWhitespace(avatar)
	) {
		return <div />;
	}
	let menu: any;
	return (
		<div className="container--avatar p-mr-2">
			<div
				onClick={(event) => menu.toggle(event)}
				className="container--click p-d-flex p-ai-center"
			>
				<p className="text--username p-my-0 p-mr-2">{username}</p>
				<div className="container--icon">
					{badge}
					<Button className="button--avatar p-button-rounded p-button-success">
						<img src={avatar} alt={username} />
					</Button>
				</div>
			</div>
			<Menu
				className="account-menu"
				model={menuItems}
				popup
				ref={(el: any) => (menu = el)}
			/>
		</div>
	);
}
