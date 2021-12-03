import React from 'react';
import 'features/Common/common.scss';

type Props = {
	callback: Function;
	defaultId: number;
};

export default function AvatarDropdown({ callback, defaultId }: Props) {
	return <div className="container--avatar-dropdown"></div>;
}
