import React from 'react';
import { footerLinks } from 'utils/constants';

import 'features/Common/common.scss';

const links = footerLinks.map((f) => (
	<a key={f.id} className={`footer-link ${f.class}`} href={f.link}>
		{f.text}
	</a>
));

export function Footer() {
	return (
		<div className="container--footer">
			<div className="container--links">{links}</div>
		</div>
	);
}
