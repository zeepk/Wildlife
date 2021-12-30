import React from 'react';
import 'features/Common/common.scss';
import { githubSponsorUrl, portfolioUrl, twitchUrl } from 'utils/constants';

export function SupportPage() {
	return (
		<div className="container--support-page p-d-flex p-jc-center p-ai-center">
			<div className="content p-d-flex p-ai-center p-jc-center p-flex-column">
				<div className="text p-text-center p-mb-3">
					Hi,{' '}
					<a href={portfolioUrl} className="p-mx-1">
						I'm matt
					</a>{' '}
					and I made this :)
				</div>
				<div className="text p-text-center">
					If you like it, you could support me by{' '}
					<a href={githubSponsorUrl} className="p-mx-1">
						sponsoring me on Github
					</a>{' '}
					which starts at like $1 a month, or drop a follow{' '}
					<a href={twitchUrl} className="p-mx-1">
						on my twitch page
					</a>{' '}
					where I livestream coding stuff.
				</div>
			</div>
		</div>
	);
}
