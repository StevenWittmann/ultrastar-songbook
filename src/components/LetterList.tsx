import Button from './Button';
import './LetterList.scss';
import type { Letter } from '../types';
import { useContext } from 'react';
import { TableContext } from '../App';
import * as Reusables from '../reusables';

export default function LetterList() {
	const filteredData = useContext(TableContext);
	return (
		<div className='letter-list'>
			{Reusables.createFirstLetterList(filteredData).map((letter: Letter) => {
				return (
					<Button
						key={letter.id}
						id={letter.id}
						title={letter.firstLetter}
						label={letter.firstLetter}
						href={`#${letter.firstLetter}`}
					></Button>
				);
			})}
		</div>
	);
}
