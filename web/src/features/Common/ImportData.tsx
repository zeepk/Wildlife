import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import 'features/Common/common.scss';
import {
	accountSettingsImportDataButtonText,
	accountSettingsImportDataLoadingText,
	accountSettingsImportDataPlaceholderText,
	errorMessageAccountSettingsCannotImport,
	errorMessageInvalidImportData,
	successMessageDataImported,
} from 'utils/constants';
import { isStringValidJson } from 'utils/helperFunctions';
import { importCaughtData } from './commonSlice';
import LoadingIcon from './LoadingIcon';

type Props = {
	callback: (...args: any[]) => any;
};

export default function ImportData({ callback }: Props) {
	const dispatch = useAppDispatch();
	const [data, setData] = useState('');
	const [loading, setLoading] = useState(false);

	const handleImport = async () => {
		if (!isStringValidJson(data)) {
			callback('error', errorMessageInvalidImportData);
			setData('');
			return;
		}
		setLoading(true);

		const legacyData = JSON.parse(data);
		const caughtThings = Object.keys(legacyData).filter(
			(k) => legacyData[k] === 'true',
		);
		callback('warn', accountSettingsImportDataLoadingText);
		dispatch(importCaughtData(caughtThings)).then((resp: any) => {
			setData('');
			setLoading(false);
			if (resp?.error) {
				callback('error', errorMessageAccountSettingsCannotImport);
				return;
			}
			callback(
				'success',
				`${successMessageDataImported} Found about ${resp?.payload.data.imported} things.`,
			);
		});
	};

	if (loading) {
		return <LoadingIcon fullScreen={false} />;
	}

	return (
		<div className="container--import-data">
			<InputText
				className="p-mr-2"
				value={data}
				placeholder={accountSettingsImportDataPlaceholderText}
				onChange={(e) => setData(e.target.value)}
			/>
			<Button
				label={accountSettingsImportDataButtonText}
				onClick={() => handleImport()}
			/>
		</div>
	);
}
