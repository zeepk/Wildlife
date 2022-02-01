import React, { useRef, useEffect } from 'react';
import { globalMessage, navbarMenuItems } from 'utils/constants';
import { Link } from 'react-router-dom';

import { Menubar } from 'primereact/menubar';
import { Toast } from 'primereact/toast';

import Logo from '../../assets/images/logo.png';
import 'features/Common/common.scss';
import AuthButtons from './Auth/AuthButtons';
import { isDevEnv, isNullUndefinedOrWhitespace } from 'utils/helperFunctions';

export function Navbar() {
	const toast = useRef<Toast>(null);
	const emergencyMessage = process.env.REACT_APP_GLOBAL_MESSAGE;
	const message = !isNullUndefinedOrWhitespace(emergencyMessage)
		? emergencyMessage
		: globalMessage;
	useEffect(() => {
		if (!isNullUndefinedOrWhitespace(message)) {
			toast?.current?.show({
				severity: 'warn',
				detail: message,
				sticky: true,
			});
		}
	}, [message]);

	const navbarMenuItemComponents = navbarMenuItems.map((item) => {
		if (!isDevEnv() && !item.active) {
			return <div />;
		}
		return {
			template: () => (
				<Link className="navbar-item p-px-2" to={item.path}>
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
			template: () => <AuthButtons checkLogin={true} />,
			className: 'container--auth',
		},
	];

	return (
		<div className="container--navbar">
			<Toast ref={toast} />
			<Menubar className="navbar" model={navbarItems} start={start} />
		</div>
	);
}
