import { h } from 'preact';

import flatButtonStyle from 'components/FlatButton/style';
import FlatButton from 'components/FlatButton';
import { splitClasses } from 'utils/className';

import style from './style';

const Button = ({ type, title, onClick, className, disabled, children }) => (
    <FlatButton
        className={splitClasses([
            flatButtonStyle[type],
            style.button,
            className
        ])}
        title={title}
        onClick={onClick}
        disabled={disabled}
    >
        {children}
    </FlatButton>
);

export default Button;
