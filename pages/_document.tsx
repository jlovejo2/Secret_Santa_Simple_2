import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext
} from 'next/document';

//This file overrides the default 'Document'
//examples of this use are to add 'lang=en, or add classes to body tag

class MainDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		//Run the parent 'getInitialProps'
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html lang='en'>
				{/* this head component should only be used for <head> code common for all pages */}
				<Head />
				<body>
					{/* any react components outside of <Main /> will not be initialized by browser.  No app logic or custom css here.  Shared components should be added to layout */}
					<Main />
					<NextScript />
					{/* here is the modal wrapper */}
					<div id='modal-root'></div>
				</body>
			</Html>
		);
	}
}

export default MainDocument;
