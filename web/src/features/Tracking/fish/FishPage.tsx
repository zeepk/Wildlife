import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {
	getAllFish,
	selectFish,
	selectTrackingLoading,
} from 'features/Tracking/trackingSlice';
import LoadingIcon from 'features/Common/LoadingIcon';
import { IconTemplate } from 'features/Tracking/common/IconTemplate';
import 'features/Tracking/tracking.scss';
import { Fish } from 'features/Tracking/trackingTypes';
import { months } from 'utils/constants';

export function FishPage() {
	const dispatch = useAppDispatch();
	const loading = useAppSelector(selectTrackingLoading);
	const fish = useAppSelector(selectFish);

	useEffect(() => {
		dispatch(getAllFish());
	}, [dispatch]);

	if (loading) {
		return <LoadingIcon fullScreen={true} />;
	}

	const iconTemplate = (rowdata: Fish) => (
		<IconTemplate uri={rowdata.icon_uri} altText={rowdata.name} />
	);

	// TODO: change field based on user hemisphere
	const monthColumns = months.map((m) => (
		<Column key={m.name} field={m.nhColumn} header={m.name} />
	));

	return (
		<div>
			<h1 className="title">Fish!</h1>
			<DataTable value={fish} responsiveLayout="scroll">
				<Column field="name" header="Name" />
				<Column
					field="icon_uri"
					header="Icon"
					className="column--icon"
					body={iconTemplate}
				/>
				<Column field="source" header="Source" />
				{monthColumns}
			</DataTable>
		</div>
	);
}
