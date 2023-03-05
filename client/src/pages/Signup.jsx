import React from 'react';
import FormHeader from '../components/FormHeader';
import Signup from '../components/Signup';

const SignupPage = () => {
	return (
		<>
			<div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
				<div className='w-full max-w-md space-y-8'>
					<FormHeader
						heading='Signup to create an account'
						paragraph='Already have an account? '
						linkName='Login'
						linkUrl='/login'
					/>
					<Signup />
				</div>
			</div>
		</>
	);
};

export default SignupPage;
