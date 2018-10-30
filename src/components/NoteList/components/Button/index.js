import { h } from 'preact';

import Button from 'components/Button';
import { splitClasses } from 'utils/className';

import style from './style';

const NoteListButton = ({
    type,
    title,
    onClick,
    className,
    disabled,
    children,
    icon
}) => (
    <Button
        className={splitClasses([style[type], style.button, className])}
        title={title}
        onClick={onClick}
        disabled={disabled}
    >
        {icon ? <img className={style['button__icon']} src={icon} /> : children}
    </Button>
);

export default NoteListButton;
