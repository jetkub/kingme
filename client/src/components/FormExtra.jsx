import React from 'react';

const FormExtra = () => {
	return (
		<div className='flex items-center justify-between'>
			<div className='flex items-center'>
				<input
					id='remember-me'
					name='remember-me'
					type='checkbox'
					className='h-4 w-4 rounded border-gray-300 text-neutral-600 accent-neutral-700 focus:ring-neutral-500'
				/>
				<label htmlFor='remember-me' className='ml-2 block font-base text-sm font-medium text-gray-900'>
					Remember me
				</label>
			</div>

			<div className='text-sm'>
				{/* we can remove this but if we feel like adding forgot password integration we can do it here*/}
				<a href='#' className='font-base font-bold text-neutral-600 hover:text-neutral-500'>
					Forgot your password?
				</a>
			</div>
		</div>
	);
};

export default FormExtra;
