import { ChangeEventHandler, HTMLInputTypeAttribute, MouseEventHandler } from 'react';
import './Input.scss';

export default function Input(props: {
	id?: string;
	name?: string;
	classNames?: string;
	type?: HTMLInputTypeAttribute;
	placeholder?: string;
	style?: object;
	value?: string;
	onClickFn?: MouseEventHandler<HTMLAnchorElement>;
	onChangeFn?: ChangeEventHandler<HTMLInputElement>;
}) {
	return (
		<input
			style={props.style}
			className={props.classNames ? 'input ' + props.classNames : 'input'}
			type={props.type}
			id={props.id}
			placeholder={props.placeholder}
			onChange={props.onChangeFn}
		/>
	);
}
