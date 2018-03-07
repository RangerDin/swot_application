import { h } from 'preact';

import style from './style';
import { splitClasses } from 'utils/className';

const FooterButton = ({
    type,
    title,
    onClick,
    className,
    disabled,
    children
}) => (
    <button
        className={splitClasses([style[type], style.button, className])}
        title={title}
        onClick={onClick}
        disabled={disabled}
    >
        {children}
    </button>
);

export default FooterButton;
