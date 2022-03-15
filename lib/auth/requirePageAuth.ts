import { NextPage, NextPageContext } from 'next';
import Router from 'next/router';

const requireAuth = (page: NextPage) => {
	console.log('require auth props: ', page);

	// if (page._authIsRequired) {
	//     return
	// }
	// page._authIsRequired = true;

	const originalGetInitialProps = page.getInitialProps;

	page.getInitialProps = async (ctx: NextPageContext) => {
		const { res, req } = ctx;

		console.log('page initial props', req.url, encodeURIComponent(req.url));

		// if (!user) {
		if (res) {
			const loginUrl = `/login?redirectTo=${encodeURIComponent(req.url)}`;
			res.writeHead(302, ' Not authenticated', { Location: loginUrl });
			res.end();
		} else {
			const loginUrl = `/login?redirectTo=${encodeURIComponent(
				window.location.pathname
			)}`;
			await Router.push(loginUrl);
		}
		// return {}
		// }
		return originalGetInitialProps ? originalGetInitialProps(ctx) : page;
	};
};

export default requireAuth;
