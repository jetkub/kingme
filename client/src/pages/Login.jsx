import React from 'react';
import FormHeader from '../components/FormHeader';

const LoginPage = () => {
	return (
		<>
			<FormHeader
				heading='Login to your account'
				paragraph="Don't have an account yet? "
				linkName='Signup'
				linkUrl='/signup'
			/>
		</>
	);
};

export default LoginPage;
