import { h } from 'preact';

import style from './style';

const Button = ({ title, children, onClick }) => (
    <button title={title} className={style.note__button} onClick={onClick}>
        {children}
    </button>
);

export default Button;
