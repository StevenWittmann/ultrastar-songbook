import './index.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';

import Input from './components/Input';
import SongCount from './components/SongCount';

import CSVReader from 'papaparse';
import { useState } from 'react';
import Table from './components/Table';
import LetterList from './components/LetterList';

function App() {
	const [data, setData] = useState([]);
	const [allSongs, setAllSongs] = useState([]);
	const [firstLetterList, setFirstLetterList] = useState([]);

	const createFirstLetterList = (_songList) => {
		const uniqueFirstLetterObjects = [];
		const encounteredFirstLetters = new Set();
		_songList.forEach((item, index, array) => {
			const firstLetter = (Object.values(item)[1] as string).charAt(0);

			if (!encounteredFirstLetters.has(firstLetter)) {
				const rangeFrom = index;
				let rangeTo =
					uniqueFirstLetterObjects.length > 0
						? (uniqueFirstLetterObjects[uniqueFirstLetterObjects.length - 1].rangeTo = rangeFrom)
						: 1;

				console.log(rangeFrom - rangeTo == 0);
				const obj = { id: uniqueFirstLetterObjects.length, firstLetter, rangeFrom, rangeTo };
				uniqueFirstLetterObjects.push(obj);
				encounteredFirstLetters.add(firstLetter);
			}
		});
		return uniqueFirstLetterObjects;
	};

	const handleFileUpload = (e) => {
		console.log('change');
		const file = e.target.files![0];
		CSVReader.parse(file, {
			header: true,
			skipEmptyLines: true,
			complete: (results) => {
				setData(results.data);
				setAllSongs(results.data);
				setFirstLetterList(createFirstLetterList(results.data));
			},
		});
	};

	const handleSearch = (e) => {
		const searchTerm = e.target.value.toLowerCase();
		const result = allSongs.filter((row: Object) => {
			return Object.values(row).find((column: string) => column.toLowerCase().includes(searchTerm));
		});

		setData(result);
		setFirstLetterList(createFirstLetterList(result));
	};

	return (
		<>
			<Header />
			<main>
				<Input type='file' placeholder='Upload CSV' onChangeFn={handleFileUpload}></Input>
				<Input
					type='text'
					id='searchInput'
					placeholder='Start typing and wait for results...'
					onChangeFn={handleSearch}
				></Input>

				{data.length ? (
					<div className='wrapper'>
						<LetterList letters={firstLetterList}></LetterList>
						<SongCount count={data.length}></SongCount>
						<Table tableRows={data} letters={firstLetterList}></Table>
					</div>
				) : (
					<div className='no-results'>No Results</div>
				)}
				<BackToTopButton />
			</main>
			<Footer />
		</>
	);
}

export default App;
