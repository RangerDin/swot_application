import { h } from 'preact';

import style from './style';
import ListType from './ListType';
import { splitClasses } from 'utils/className';

const FooterButton = ({ type, onClick, children }) => (
    <button
        className={splitClasses([style['note-list__button'], style[type]])}
        onClick={onClick}
    >
        {children}
    </button>
);

const Footer = ({ type, addNewNote }) => (
    <div className={style['note-list__footer']}>
        <ListType type={type} />
        <div className={style['note-list__button-block']}>
            <FooterButton onClick={addNewNote}>+</FooterButton>
        </div>
    </div>
);

export default Footer;
