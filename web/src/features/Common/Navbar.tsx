import React from 'react';
import { navbarMenuItems } from 'utils/constants';
import { Link } from 'react-router-dom';

import { Menubar } from 'primereact/menubar';

import Logo from '../../assets/images/logo.png';
import 'features/Common/common.scss';
import { AuthButtons } from './Auth/AuthButtons';

export function Navbar() {
	const navbarMenuItemComponents = navbarMenuItems.map((item) => {
		return {
			template: () => (
				<Link className="navbar-item p-px-3" to={item.path}>
					{item.text}
				</Link>
			),
		};
	});

	const start = (
		<div className="p-d-flex p-jc-start p-ai-center">
			<Link to="/">
				<img className="img--logo p-ml-1" src={Logo} alt="logo" />
			</Link>
		</div>
	);

	const navbarItems = [
		...navbarMenuItemComponents,
		{
			template: () => <AuthButtons />,
			className: 'container--auth',
		},
	];

	return <Menubar className="navbar" model={navbarItems} start={start} />;
}
