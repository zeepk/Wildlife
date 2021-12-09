import React from 'react';
import { ProgressBar } from 'primereact/progressbar';
import 'features/Common/common.scss';

type Props = {
	fullScreen: boolean;
};

export default function LoadingIcon({ fullScreen }: Props) {
	const loadingClass = fullScreen ? 'fullscreen' : '';
	return (
		<div className={loadingClass}>
			<ProgressBar mode="indeterminate" className="loading--global" />
		</div>
	);
}
