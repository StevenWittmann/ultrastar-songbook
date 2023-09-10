import { useContext } from 'react';
import { TableContext } from '../App';

export default function SongCount() {
	const filteredData = useContext(TableContext);
	return (
		<div style={{ marginBottom: '1rem' }}>
			Songs found: <span id='songCount'>{filteredData.length}</span>
		</div>
	);
}
