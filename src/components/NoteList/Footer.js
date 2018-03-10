import { h } from 'preact';

import style from './style';
import ListType from './ListType';
import AddButton from './components/AddButton';
import DeleteButton from './components/DeleteButton';

const Footer = ({
    type,
    addNewNote,
    requestDeleteAllNotes,
    isNoteListEmpty
}) => (
    <div className={style['note-list__footer']}>
        <ListType type={type} />
        <div className={style['note-list__button-block']}>
            <AddButton
                className={style['note-list__footer-button']}
                type={type}
                onClick={addNewNote}
            />
            <DeleteButton
                className={style['note-list__footer-button']}
                type={type}
                onClick={requestDeleteAllNotes}
                disabled={isNoteListEmpty}
            />
        </div>
    </div>
);

export default Footer;
