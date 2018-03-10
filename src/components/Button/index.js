import { h } from 'preact';

import { splitClasses } from 'utils/className';

import style from './style';

const Button = ({ title, disabled, className, onClick, children }) => (
    <button
        title={title}
        disabled={disabled}
        className={splitClasses([style.button, className])}
        onClick={onClick}
    >
        {children}
    </button>
);

export default Button;
