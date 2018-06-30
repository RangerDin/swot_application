import { h } from 'preact';

import style from './style';
import { splitClasses } from 'utils/className';

const MenuIcon = ({ isFolded, toggleMenu }) => (
    <div
        className={splitClasses([
            style.icon,
            isFolded ? style.folded : style.unfolded
        ])}
        onClick={toggleMenu}
    />
);

export default MenuIcon;
