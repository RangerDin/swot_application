import { h } from 'preact';

import style from './style';
import ListType from './ListType';
import AddButton from './AddButton';
import DeleteButton from './DeleteButton';

const Footer = ({ type, addNewNote, deleteAllNotes }) => (
    <div className={style['note-list__footer']}>
        <ListType type={type} />
        <div className={style['note-list__button-block']}>
            <AddButton
                className={style['note-list__button']}
                onClick={addNewNote}
            />
            <DeleteButton
                className={style['note-list__button']}
                onClick={deleteAllNotes}
            />
        </div>
    </div>
);

export default Footer;
