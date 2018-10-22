import { h } from 'preact';

import { splitClasses } from 'utils/className';

import style from './style';

const Link = ({ children, className, ...props }) => (
    <a className={splitClasses([style.link, className])} {...props}>
        {children}
    </a>
);

export default Link;
