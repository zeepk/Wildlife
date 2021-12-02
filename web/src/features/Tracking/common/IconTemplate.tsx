import React, { FunctionComponent } from 'react';
type props = {
	uri: string;
	altText: string;
};

export const IconTemplate: FunctionComponent<props> = ({ uri, altText }) => {
	return <img className="icon" src={uri} alt={altText} />;
};
