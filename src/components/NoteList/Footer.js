import { h } from 'preact';

import style from './style';
import ListType from './ListType';
import { splitClasses } from 'utils/className';
import IconTrash from 'asserts/icons/icons8-trash-32.png';

const FooterButton = ({ type, onClick, children }) => (
    <button
        className={splitClasses([style['note-list__button'], style[type]])}
        onClick={onClick}
    >
        {children}
    </button>
);

const Footer = ({ type, addNewNote, deleteAllNotes }) => (
    <div className={style['note-list__footer']}>
        <ListType type={type} />
        <div className={style['note-list__button-block']}>
            <FooterButton onClick={addNewNote}>+</FooterButton>
            <FooterButton onClick={deleteAllNotes}>
                <img
                    className={style['note-list__button-icon']}
                    src={IconTrash}
                />
            </FooterButton>
        </div>
    </div>
);

export default Footer;
