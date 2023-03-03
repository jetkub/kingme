import React, { useState } from 'react';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


import './App.css';
import Header from './components/Header';
import Checkers from './components/Checkers';
import Menu from './components/Menu';
import { Route, Routes } from 'react-router-dom';

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
		return (
			<ApolloProvider client={client}>
		<div className='bg-stone-200 min-h-screen'>
			<Header />
			<main className='flex flex-col items-center justify-center m-4'>
				<Routes>
					<Route path='/' element={<Menu />} />
					<Route path='/game' element={<Checkers />} />
				</Routes>
			</main>
		</div>
		</ApolloProvider>
	);

}

export default App;