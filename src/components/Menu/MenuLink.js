import { h } from 'preact';

import style from './style';
import { splitClasses } from 'utils/className';

const MenuLink = ({ href, onClick, children, className }) => (
    <a
        href={href}
        className={splitClasses([style.menu__link, className])}
        onClick={onClick}
    >
        {children}
    </a>
);

export default MenuLink;
