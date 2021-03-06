import { h } from 'preact';

import Button from 'components/Button';
import { splitClasses } from 'utils/className';

import style from './style';

const NoteListButton = ({ type, className, children, icon, ...props }) => (
    <Button
        className={splitClasses([style[type], style['button'], className])}
        {...props}
    >
        {icon ? <img className={style['button__icon']} src={icon} /> : children}
    </Button>
);

export default NoteListButton;
