import React from 'react';
import 'features/Common/common.scss';

type Props = {
	fullScreen: boolean;
};

export default function LoadingIcon({ fullScreen }: Props) {
	const loadingClass = fullScreen ? 'fullscreen' : '';
	return (
		<div className={loadingClass}>
			<i className="pi icon--search pi-spin" />
			<h1>loading...</h1>
		</div>
	);
}
