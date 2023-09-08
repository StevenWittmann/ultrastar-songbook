export default function SongCount(props: { count: number }) {
	return (
		<div style={{ marginBottom: '1rem' }}>
			Songs found: <span id='songCount'>{props.count}</span>
		</div>
	);
}
