import { useContext, useEffect, useState } from 'react';
import { TableContext } from '../App';
import * as Reusables from '../reusables';

export default function Table() {
	const favData = localStorage.getItem('favorites');
	const [favorites, setFavorites] = useState(favData ? JSON.parse(favData) : []);
	const filteredData = useContext(TableContext);

	useEffect(() => {
		localStorage.setItem('favorites', JSON.stringify(favorites));
	}, [favorites]);

	return (
		<div className='table-container'>
			{Reusables.createFirstLetterList(filteredData).map((letter, index, array) => {
				console.log('Table rendered');
				return (
					<table id={letter.firstLetter} key={index} className='list'>
						<caption style={{ captionSide: 'inline-start', textAlign: 'left' }}>{letter.firstLetter}</caption>
						{index === 0 && (
							<thead>
								{filteredData.slice(0, 1).map((row, index) => {
									return (
										<tr key={'tablehead-' + index}>
											{Object.keys(row).map((column, index) => {
												return <th key={index + 'thead'}>{column}</th>;
											})}
										</tr>
									);
								})}
							</thead>
						)}
						<tbody className='tableBody'>
							{filteredData
								.slice(letter.rangeFrom, index === array.length - 1 ? 9999 : letter.rangeTo)
								.map((row: {}, index: number) => {
									return (
										<tr
											key={index}
											onClick={() => {
												setFavorites((prevValue: []) => {
													return Reusables.toggleObject(prevValue, row);
												});
											}}
											className={index % 2 === 0 ? '' : 'odd'}
										>
											{Object.keys(row).map((column) => {
												return <td key={index + 'tdata' + column}>{row[column]}</td>;
											})}
										</tr>
									);
								})}
						</tbody>
					</table>
				);
			})}
		</div>
	);
}
