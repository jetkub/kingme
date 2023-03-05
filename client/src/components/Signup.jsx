import React, { useState } from 'react';
import { signupFields } from '../constants/formFields';
import FormAction from './FormAction';
import Input from './Input';

const fields = signupFields;
let fieldsState = {};

// for each field in the signupFields array, create a key/value pair in the fieldsState object
// the fieldState object will be used to set the state of the Signup component
// this data will be used to create a new user account (sent to the server with the createAccount function)
fields.forEach((field) => (fieldsState[field.id] = ''));

const Signup = () => {
	const [signupState, setSignupState] = useState(fieldsState);

	const handleChange = (e) => setSignupState({ ...signupState, [e.target.id]: e.target.value });

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(signupState);
		createAccount();
	};

	// handle signup here through api
	const createAccount = () => {};

	return (
		<form className='mt-8 space-y-6' onSubmit={handleSubmit}>
			<div className=''>
				{fields.map((field) => (
					<Input
						key={field.id}
						handleChange={handleChange}
						value={signupState[field.id]}
						labelText={field.labelText}
						labelFor={field.labelFor}
						id={field.id}
						name={field.name}
						type={field.type}
						isRequired={field.isRequired}
						placeholder={field.placeholder}
					/>
				))}
				<FormAction handleSubmit={handleSubmit} text='signup' />
			</div>
		</form>
	);
};

export default Signup;
