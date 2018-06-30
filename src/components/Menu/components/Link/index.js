import { h } from 'preact';

import { splitClasses } from 'utils/className';

import style from './style';

const Link = ({
    href,
    target,
    rel,
    onClick,
    children,
    className,
    tabIndex
}) => (
    <a
        href={href}
        rel={rel}
        target={target}
        className={splitClasses([style.link, className])}
        onClick={onClick}
        tabIndex={tabIndex}
    >
        {children}
    </a>
);

export default Link;
