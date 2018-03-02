import { h } from 'preact';

import style from './style';
import { splitClasses } from 'utils/className';

const MenuLink = ({ href, download, children, className }) => (
    <a
        href={href}
        download={download}
        className={splitClasses([style.menu__link, className])}
    >
        {children}
    </a>
);

export default MenuLink;
