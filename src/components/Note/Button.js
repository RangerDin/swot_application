import { h } from 'preact';

import style from './style';
import { splitClasses } from 'utils/className';

const Button = ({ title, disabled, children, className, onClick }) => (
    <button
        title={title}
        className={splitClasses([style.button, className])}
        disabled={disabled}
        onClick={onClick}
    >
        {children}
    </button>
);

export default Button;
