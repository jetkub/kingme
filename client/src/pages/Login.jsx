import React from 'react';
import FormHeader from '../components/FormHeader';
import Login from '../components/Login';

const LoginPage = () => {
	return (
		<>
			<div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
				<div className='w-full max-w-md space-y-8'>
					<FormHeader
						heading='Login to your account'
						paragraph="Don't have an account yet? "
						linkName='Signup'
						linkUrl='/signup'
					/>
					<Login />
				</div>
			</div>
		</>
	);
};

export default LoginPage;
