import './index.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';

import Input from './components/Input';
import SongCount from './components/SongCount';

import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import Table from './components/Table';
import LetterList from './components/LetterList';
import LZString from 'lz-string';

function App() {
	const [data, setData] = useState(
		localStorage.getItem('songs') ? JSON.parse(LZString.decompressFromUTF16(localStorage.getItem('songs'))) || [] : []
	);
	const [filterText, setFilterText] = useState('');
	const [scrollHeight, setScrollHeight] = useState(document.scrollingElement.scrollHeight);

	const handleNavigation = useCallback(() => {
		if (window.scrollY > 15) {
			document.getElementById('root').classList.add('scrolled');
		} else {
			document.getElementById('root').classList.remove('scrolled');
		}
		setScrollHeight(window.scrollY);
	}, [scrollHeight]);

	useEffect(() => {
		window.addEventListener('scroll', handleNavigation);

		return () => {
			window.removeEventListener('scroll', handleNavigation);
		};
	}, [handleNavigation]);

	// Memoized filtered data
	const filteredData = useMemo(() => {
		return data.filter((row) => {
			return Object.values(row).find((column: string) => column.toLowerCase().includes(filterText));
		});
	}, [data, filterText]);

	const handleFilterChange = (e, timer = 0) => {
		window.clearTimeout(timer);
		timer = window.setTimeout(() => {
			console.log('setFilter', e.target.value);
			setFilterText(e.target.value);
		}, 500);
	};

	return (
		<>
			<Header />
			<main>
				<Input
					type='text'
					value={filterText}
					id='searchInput'
					placeholder='Start typing and wait for results...'
					onChangeFn={handleFilterChange}
				></Input>

				{data.length ? (
					<TableContext.Provider value={filteredData}>
						<div className='wrapper'>
							<LetterList></LetterList>
							<SongCount></SongCount>
							<Table></Table>
						</div>
					</TableContext.Provider>
				) : (
					<div className='no-results'>
						<p>No Data provided. Consider uploading a csv file with your songs.</p>
						<p>For a better experience make sure the csv has</p>
						<ul>
							<li>a semicolon (;) as separator</li>
							<li>the first column is a id</li>
							<li>the second column contains the artist name</li>
						</ul>
					</div>
				)}
				<BackToTopButton />
			</main>
			<Footer />
		</>
	);
}
export const TableContext = createContext(null);
export default App;
