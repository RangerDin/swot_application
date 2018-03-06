import { h } from 'preact';

import style from './style';
import ListType from './ListType';
import { splitClasses } from 'utils/className';
import IconTrash from 'asserts/icons/icons8-trash-32.png';

const FooterButton = ({ type, title, onClick, className, children }) => (
    <button
        className={splitClasses([
            style['note-list__button'],
            style[type],
            className
        ])}
        title={title}
        onClick={onClick}
    >
        {children}
    </button>
);

const AddButton = ({ onClick }) => (
    <FooterButton title="Add new note" onClick={onClick}>
        +
    </FooterButton>
);

const DeleteButton = ({ onClick }) => (
    <FooterButton
        title="Delete all notes"
        onClick={onClick}
        className={style['note-list__button_delete']}
    >
        <img className={style['note-list__button-icon']} src={IconTrash} />
    </FooterButton>
);

const Footer = ({ type, addNewNote, deleteAllNotes }) => (
    <div className={style['note-list__footer']}>
        <ListType type={type} />
        <div className={style['note-list__button-block']}>
            <AddButton onClick={addNewNote} />
            <DeleteButton onClick={deleteAllNotes} />
        </div>
    </div>
);

export default Footer;
