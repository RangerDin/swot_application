import { h } from 'preact';

import style from './style';

const Button = ({ children, onClick }) => (
    <button className={style.note__close} onClick={onClick}>
        {children}
    </button>
);

export default Button;
