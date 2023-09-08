import Button from './Button';
import './LetterList.scss';
import type { Letter } from '../types';

export default function LetterList(props: { letters: Object[] }) {
	return (
		<div className='letter-list'>
			{props.letters.map((letter: Letter) => {
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
