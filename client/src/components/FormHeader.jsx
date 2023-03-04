import React from 'react';
import { Link } from 'react-router-dom';
import crown from '../assets/crown.png';

const FormHeader = ({ heading, paragraph, linkName, linkUrl = '#' }) => {
	return (
		<div className='mb-10'>
			<div className='flex justify-center'>
				<img alt='' className='h-14 w-14' src={crown} />
			</div>
			<h2 className='mt-6 text-center font-hero text-3xl text-gray-900'>{heading}</h2>
			<p className='mt-5 text-center font-base text-base text-gray-600'>
				{paragraph}{' '}
				<Link to={linkUrl} className='font-medium text-neutral-900 hover:text-neutral-700'>
					{linkName}
				</Link>
			</p>
		</div>
	);
};

export default FormHeader;
