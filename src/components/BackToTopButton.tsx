import Button from './Button';
import './BackToTopButton.scss';

const scrollToTop = () => {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
};

export default function BackToTopButton() {
	return <Button classNames='button-back-to-top' label='Back to top' title='UP' onClickFn={scrollToTop}></Button>;
}
