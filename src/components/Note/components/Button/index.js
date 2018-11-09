import { h } from 'preact';

import Button from 'components/Button';
import { splitClasses } from 'utils/className';

import style from './style';

const NoteButton = ({ className, children, icon, ...props }) => (
    <Button className={splitClasses([style['button'], className])} {...props}>
        {icon ? <img className={style['button__icon']} src={icon} /> : children}
    </Button>
);

export default NoteButton;
