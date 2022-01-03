import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { ProgressBar } from 'primereact/progressbar';
import {
	getUserTotals,
	selectOverall,
	selectTotals,
	selectTrackingLoading,
} from 'features/Tracking/trackingSlice';
import LoadingIcon from 'features/Common/LoadingIcon';
import 'features/Tracking/tracking.scss';
import { TotalCard } from '../cards/TotalCard';
import { totalsOverallText } from 'utils/constants';

export function TotalsPage() {
	const dispatch = useAppDispatch();
	const loading = useAppSelector(selectTrackingLoading);
	const totals = useAppSelector(selectTotals);
	const overall = useAppSelector(selectOverall);

	useEffect(() => {
		if (totals.length === 0) {
			dispatch(getUserTotals());
		}
	}, [dispatch, totals.length]);

	if (loading) {
		return <LoadingIcon fullScreen={true} />;
	}

	return (
		<div className="page--totals p-d-flex p-flex-column p-jc-center p-ai-center">
			<ProgressBar
				className="overall p-mt-6"
				color="#62a57d"
				value={overall?.percentage}
			/>
			<div className="text overall p-text-center">{totalsOverallText}</div>
			<div className="container--totals p-mt-4 p-p-2 p-d-flex p-flex-wrap p-jc-center">
				{totals.map((t) => (
					<TotalCard item={t} key={t.critterType} />
				))}
			</div>
		</div>
	);
}
