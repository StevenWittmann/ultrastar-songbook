import { MouseEventHandler } from 'react';
import './Button.scss';

export default function Button(props: {
	title: string;
	id?: string;
	key?: string;
	classNames?: string;
	label?: string;
	style?: object;
	href?: string;
	onClickFn?: MouseEventHandler<HTMLAnchorElement>;
}) {
	return (
		<a
			id={props.id}
			href={props.href}
			style={props.style}
			className={props.classNames ? 'button ' + props.classNames : 'button'}
			aria-label={props.label}
			onClick={props.onClickFn}
		>
			{props.title}
		</a>
	);
}
