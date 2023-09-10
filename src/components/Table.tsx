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
								.map((row: { isFavorite }, index: number) => {
									return (
										<tr
											ref={index + 'asdf'}
											key={index}
											onClick={() => {
												row['isFavorite'] = !row['isFavorite'];
												console.log(row);
											}}
											className={row.isFavorite ? 'favorite' : null}
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
