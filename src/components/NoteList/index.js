import { h } from 'preact';

import style from './style';
import Note from 'components/Note';

const NoteList = ({ title, className, notes }) => (
    <div className={[style['note-list'], style[className]].join(' ')}>
        <div className={style['note-list__container']}>
            <h3 className={style['note-list__header']}>{title}</h3>
            <div className={style['note-list__widget']}>
                <div className={style['note-list__notes']}>
                    {notes.map(note => (
                        <Note key={note.id} className={className} note={note} />
                    ))}
                </div>
                <button
                    className={[style['note-list__add'], className].join(' ')}
                >
                    +
                </button>
            </div>
        </div>
    </div>
);

export default NoteList;
