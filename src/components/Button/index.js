import { h } from 'preact';

import { splitClasses } from 'utils/className';

import style from './style';

const Button = ({ className, children, ...props }) => (
    <button className={splitClasses([className, style.button])} {...props}>
        {children}
    </button>
);

export default Button;
