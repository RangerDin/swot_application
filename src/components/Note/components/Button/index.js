import { h } from 'preact';

import Button from 'components/Button';
import { splitClasses } from 'utils/className';

import style from './style';

const NoteButton = ({ title, disabled, children, className, onClick }) => (
    <Button
        title={title}
        className={splitClasses([style.button, className])}
        disabled={disabled}
        onClick={onClick}
    >
        {children}
    </Button>
);

export default NoteButton;
