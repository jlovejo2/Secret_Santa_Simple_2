import { FC } from 'react';
import cn from 'classnames';
import Link from 'next/link';
// import { useRouter } from 'next/router'
// import type { Page } from '@bigcommerce/storefront-data-hooks/api/operations/get-all-pages'
// import getSlug from '@lib/get-slug'
import { Github } from '../../components/icons';
// import { Logo, Container } from '@components/ui'
import s from './Footer.module.css';

interface Props {
	className?: string;
	children?: any;
}

const Footer: FC<Props> = ({ className }) => {
	const rootClassName = cn(className);

	return (
		<footer className={rootClassName}>
			<div>
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-accents-2 py-12 text-primary bg-primary transition-colors duration-150'>
					<div className='col-span-1 lg:col-span-2'>
						<Link href='/'>
							<a className='flex flex-initial items-center font-bold md:mr-24'>
								<span className='rounded-full border border-gray-700 mr-2'>
									Logo goes here
								</span>
								<span>ACME</span>
							</a>
						</Link>
					</div>
					<div className='col-span-1 lg:col-span-2'>
						<ul className='flex flex-initial flex-col md:flex-1'>
							<li className='py-3 md:py-0 md:pb-4'>
								<Link href='/'>
									<a className='text-primary hover:text-accents-6 transition ease-in-out duration-150'>
										Home
									</a>
								</Link>
							</li>
						</ul>
					</div>
					<div className='col-span-1 lg:col-span-6 flex items-start lg:justify-end text-primary'>
						<div className='flex space-x-6 items-center h-10'>
							<a
								aria-label='Github Repository'
								href='https://github.com/jlovejo2/Secret_Santa_Simple_2'
								className={s.link}
							>
								<Github />
							</a>
						</div>
					</div>
				</div>
				<div className='py-12 flex flex-col md:flex-row justify-between items-center space-y-4'>
					<div>
						<span>&copy; 2020 ACME, Inc. All rights reserved.</span>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
