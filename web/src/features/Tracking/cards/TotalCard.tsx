import React, { FunctionComponent } from 'react';
import { Total } from 'features/Tracking/trackingTypes';
import { navbarMenuItems } from 'utils/constants';
import { Chart } from 'primereact/chart';

type props = {
	item: Total;
};

export const TotalCard: FunctionComponent<props> = ({ item }) => {
	const name = navbarMenuItems.find((n) => n.type === item.critterType)?.text;
	const chartData = {
		datasets: [
			{
				data: [item.done, item.total - item.done],
				backgroundColor: ['#62a57d', '#c58c8c'],
			},
		],
	};

	const options = {
		plugins: {
			legend: {
				labels: {
					color: '#495057',
				},
			},
		},
	};

	return (
		<div className="p-m-4 container--card-content p-d-flex p-ai-center p-flex-column">
			<Chart
				type="doughnut"
				data={chartData}
				options={options}
				style={{ width: '80%' }}
			/>
			<div className="text p-text-center">{name}</div>
			<div className="text percentage p-text-center">{item.percentage}%</div>
		</div>
	);
};
