import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from 'app/hooks';
import {
	selectAccountUsername,
	selectAccountAvatar,
} from 'features/Common/commonSlice';
import { isNullUndefinedOrWhitespace } from 'utils/helperFunctions';

import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import 'features/Common/common.scss';
import { logoutUrl } from 'utils/constants';

export function AccountIcon() {
	const history = useHistory();
	const username = useAppSelector(selectAccountUsername);
	const avatar = useAppSelector(selectAccountAvatar);
	// const [avatarUri, setAvatarUri] = useState(avatar);

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
		},
		{
			label: 'Your Totals',
			icon: 'pi pi-chart-bar',
			command: () => history.push('/totals'),
		},
		{ separator: true },
		{
			label: 'Logout',
			icon: 'pi pi-sign-out',
			command: () => (window.location.href = logoutUrl),
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
				<Button className="button--avatar p-button-rounded p-button-success">
					<img src={avatar} alt={username} />
				</Button>
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
