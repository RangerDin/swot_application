import { h } from 'preact';

import style from './style';
import { splitClasses } from 'utils/className';

const MenuItem = ({ title, children, onClick, className }) => (
    <div
        className={splitClasses([style.menu__item, className])}
        onClick={onClick}
        title={title}
    >
        {children}
    </div>
);

export const LeftMenuItem = ({ title, children, onClick }) => (
    <MenuItem title={title} className={style.menu__item_left} onClick={onClick}>
        {children}
    </MenuItem>
);

export const RightMenuItem = ({ title, children, onClick }) => (
    <MenuItem
        title={title}
        className={style.menu__item_right}
        onClick={onClick}
    >
        {children}
    </MenuItem>
);

export default MenuItem;
