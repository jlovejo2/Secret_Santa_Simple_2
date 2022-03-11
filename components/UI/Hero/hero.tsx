import React, { FC } from 'react';
import { RightArrowIcon } from '../../UI/Icons';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
	className?: string;
	headline: string;
	description: string;
}

const Hero: FC<Props> = ({ headline, description }) => {
	return (
		<div className='relative h-150 col-start-1 col-span-6'>
			<Image
				src={'/assets/images/secret_santa_gift_box.jpg'}
				alt={'Hero'}
				aria-label='Hero'
				className={'block mx-auto align-middle content-center'}
				layout='responsive'
				width={250}
				height={150}
				loading='eager'
				quality={100}
			/>
			<div className={`.hero absolute top-10 left-5`}>
				<div className='flex flex-wrap content-center'>
					<h2 className='text-4xl leading-10 font-extrabold text-white sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl'>
						{headline}
					</h2>
					<p className='mt-5 text-xl leading-7 text-accent-2 text-white'>
						{description}
					</p>
					<Link href='/blog'>
						<a className='text-white pt-3 font-bold hover:underline flex flex-row cursor-pointer w-max-content'>
							Read it here
							<RightArrowIcon width='20' heigh='20' className='ml-1' />
						</a>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Hero;
