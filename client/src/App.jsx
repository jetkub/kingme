import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Checkers from './components/Checkers';
import Checkers2P from './components/Checkers2p'
import Menu from './pages/Menu';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import Auth from './utils/auth';
import Login from './components/Login';

const httpLink = createHttpLink({
	uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem('id_token');
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

function App() {
	// if not logged in, redirect to login page
	if (!Auth.loggedIn()) {
		return (
			<ApolloProvider client={client}>
				<div className='min-h-screen bg-stone-200'>
					<main className='flex flex-col items-center justify-center'>
						<Routes>
							<Route path='/' element={<LoginPage />} />
							<Route path='/login' element={<LoginPage />} />
							<Route path='/signup' element={<SignupPage />} />
						</Routes>
					</main>
				</div>
			</ApolloProvider>
		);
	} else {
		return (
			<ApolloProvider client={client}>
				<div className='min-h-screen bg-stone-200'>
					<Header />
					<main className='flex flex-col items-center justify-center'>
						<Routes>
							<Route path='/' element={<Menu />} />
							<Route path='/solo' element={<Checkers />} />
							<Route path='/multiplayer' element={<Checkers2P />} />
							<Route path='/login' element={<LoginPage />} />
							<Route path='/signup' element={<SignupPage />} />
						</Routes>
					</main>
				</div>
			</ApolloProvider>
		);
	}
}

export default App;
