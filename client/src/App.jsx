import { useState } from 'react'
import './App.css';
import Header from './components/Header';
import Checkers from './components/Checkers';
import Menu from './components/Menu';
import { Route, Routes } from 'react-router-dom';


function App() {
		return (
		<div className='bg-stone-200 min-h-screen'>
			<Header />
			<main className='flex flex-col items-center justify-center m-4'>
				<Routes>
					<Route path='/' element={<Menu />} />
					<Route path='/game' element={<Checkers />} />
				</Routes>
			</main>
		</div>
	);

}

export default App;
