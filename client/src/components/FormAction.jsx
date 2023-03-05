import React from 'react';

const FormAction = ({ handleSubmit, type = 'Button', action = 'submit', text }) => {
	return (
		<>
			{type === 'Button' ? (
				<button
					type={action}
					className='group relative mt-10 flex w-full justify-center rounded-none border-4 border-transparent bg-red-600 py-2 px-4 text-base font-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-neutral-700 focus:ring-offset-2'
					onSubmit={handleSubmit}
				>
					{text}
				</button>
			) : (
				<></>
			)}
		</>
	);
};

export default FormAction;
