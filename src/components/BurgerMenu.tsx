import { pushRotate as Menu } from 'react-burger-menu';

import './BurgerMenu.scss';
import Button from './Button';
import FileUploadButton from './FileUploadButton';
import { useState } from 'react';

export default function BurgerMenu(props) {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<Menu isOpen={isOpen} className='bm-burger-button' pageWrapId={props.pageWrapId}>
			<Button
				style={{ marginBottom: '.5rem' }}
				classNames='menu-item'
				label='Favorites'
				title='Favorites ToDo'
				onClickFn={() => {
					setIsOpen(false);
				}}
			></Button>
			<FileUploadButton></FileUploadButton>
		</Menu>
	);
}
