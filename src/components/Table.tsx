import type { Letter } from '../types';
export default function Table(props: { tableRows: any[]; letters: Letter[] }) {
	return (
		<div className='table-container'>
			{props.letters.map((letter, index, array) => {
				return (
					<table id={letter.firstLetter} key={index} className='list'>
						<caption style={{ captionSide: 'inline-start', textAlign: 'left' }}>{letter.firstLetter}</caption>
						{index === 0 && (
							<thead>
								{props.tableRows.slice(0, 1).map((row, index) => {
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
							{props.tableRows
								.slice(letter.rangeFrom, index === array.length - 1 ? 9999 : letter.rangeTo)
								.map((row, index) => {
									return (
										<tr key={index} className={index % 2 === 0 ? '' : 'odd'}>
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
