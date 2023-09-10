import './index.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';

import Input from './components/Input';
import SongCount from './components/SongCount';

import { createContext, useMemo, useState } from 'react';
import Table from './components/Table';
import LetterList from './components/LetterList';
import LZString from 'lz-string';

function App() {
	console.log('App Rerendered');

	const [data, setData] = useState(JSON.parse(LZString.decompressFromUTF16(localStorage.getItem('songs'))) || []);
	const [filterText, setFilterText] = useState('');

	// Memoized filtered data
	const filteredData = useMemo(() => {
		return data.filter((row) => {
			return Object.values(row).find((column: string) => column.toLowerCase().includes(filterText));
		});
	}, [data, filterText]);

	const handleFilterChange = (e) => {
		setFilterText(e.target.value);
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
