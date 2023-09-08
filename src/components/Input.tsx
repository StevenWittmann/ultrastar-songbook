import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';
import './Input.scss';

export default function Input(props: {
	id?: string;
	name?: string;
	classNames?: string;
	type?: HTMLInputTypeAttribute;
	placeholder?: string;
	onChangeFn?: ChangeEventHandler<HTMLInputElement>;
}) {
	return (
		<input
			className={props.classNames ? 'input ' + props.classNames : 'input'}
			type={props.type}
			id={props.id}
			placeholder={props.placeholder}
			onChange={props.onChangeFn}
		/>
	);
}
