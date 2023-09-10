import Input from './Input';
import CSVReader from 'papaparse';
import LZString from 'lz-string';
import { MouseEventHandler } from 'react';
import Button from './Button';

/**
 * handle csv and put data into local storage
 * @param event upload event
 */
const handleFileUpload = (event) => {
	CSVReader.parse(event.target.files![0], {
		header: true,
		skipEmptyLines: true,
		complete: (results) => {
			let dataString = JSON.stringify(results.data);
			dataString = LZString.compressToUTF16(dataString);
			if (new Blob([dataString]).size < 5_000_000) localStorage.setItem('songs', dataString);
			location.reload();
		},
	});
};

export default function FileUploadButton(props: { onClickFn?: MouseEventHandler<HTMLAnchorElement> }) {
	return (
		<>
			<Button
				classNames='menu-item'
				label='Upload'
				title='Upload'
				onClickFn={() => {
					document.getElementById('file-upload').click();
				}}
			></Button>
			<Input
				id='file-upload'
				style={{ display: 'none' }}
				type='file'
				placeholder='Upload CSV'
				onClickFn={props.onClickFn}
				onChangeFn={handleFileUpload}
			></Input>
		</>
	);
}
