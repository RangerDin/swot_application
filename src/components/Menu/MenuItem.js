import { h } from 'preact';

import style from './style';
import { splitClasses } from 'utils/className';

const MenuItem = ({ children, onClick, className }) => (
    <div
        className={splitClasses([style.menu__item, className])}
        onClick={onClick}
    >
        {children}
    </div>
);

export const LeftMenuItem = ({ children, onClick }) => (
    <MenuItem className={style.menu__item_left} onClick={onClick}>
        {children}
    </MenuItem>
);

export const RightMenuItem = ({ children, onClick }) => (
    <MenuItem className={style.menu__item_right} onClick={onClick}>
        {children}
    </MenuItem>
);

export default MenuItem;
