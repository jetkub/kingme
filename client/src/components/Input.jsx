import React from 'react';

const styleClasses = {
	input:
		'appearance-none border-4 rounded-none relative block min-w-full px-3 py-2 border-neutral-600 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-600 focus:ring-2 focus:z-10 sm:text-sm',
};

const Input = ({
	handleChange,
	value,
	labelText,
	labelFor,
	id,
	name,
	type,
	isRequired = false,
	placeholder,
	customClass,
}) => {
	return (
		<div className='my-5'>
			<label htmlFor={labelFor} className='sr-only'>
				{labelText}
			</label>
			<input
				onChange={handleChange}
				value={value}
				id={id}
				name={name}
				type={type}
				required={isRequired}
				// customClass is a string that is passed in from the parent component,
				// and it is used to add custom styles to the input element on top of
				// the existing input style if desired
				className={styleClasses.input + customClass}
				placeholder={placeholder}
			/>
		</div>
	);
};

export default Input;
