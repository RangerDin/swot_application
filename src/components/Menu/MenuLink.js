import { h } from 'preact';

import style from './style';
import { splitClasses } from 'utils/className';

const MenuLink = ({ href, onClick, children, className, tabIndex }) => (
    <a
        href={href}
        className={splitClasses([style.menu__link, className])}
        onClick={onClick}
        tabIndex={tabIndex}
    >
        {children}
    </a>
);

export default MenuLink;
