import React, { useState } from 'react';
import { loginFields } from '../constants/formFields';
import FormAction from './FormAction';
import FormExtra from './FormExtra';
import Input from './Input';

import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutation';

import Auth from '../utils/auth';

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ''));

const Login = () => {
	const [loginState, setLoginState] = useState(fieldsState);
	const [login, { error, data }] = useMutation(LOGIN);

	const handleChange = (e) => {
		setLoginState({ ...loginState, [e.target.id]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(loginState);
		authenticateUser();
	};

	// handle login here
	const authenticateUser = async () => {
		try {
			const { data } = await login({
				variables: { ...loginState },
			});
			Auth.login(data.login.token);
		} catch (err) {
			console.error(err);
		}

		console.log(data);

		// clear form values
		// setLoginState(fieldsState);

		// redirect to homepage
		// window.location.assign('/');
	};

	return (
		<form className='mt-8 space-y-6' onSubmit={handleSubmit}>
			<div className='-space-y-px'>
				{fields.map((field) => (
					<Input
						key={field.id}
						handleChange={handleChange}
						value={loginState[field.id]}
						labelText={field.labelText}
						labelFor={field.labelFor}
						id={field.id}
						name={field.name}
						type={field.type}
						isRequired={field.isRequired}
						placeholder={field.placeholder}
					/>
				))}
			</div>
			<FormExtra />
			<FormAction handleSubmit={handleSubmit} text='login' />
		</form>
	);
};

export default Login;
