import { h } from 'preact';
import { PureComponent } from 'preact-compat';

import style from './style';
import NoteListDropTarget from './NoteListDropTarget';
import Note from 'components/Note';
import { splitClasses } from 'utils/className';

class NoteList extends PureComponent {
    addNewNote = () => {
        this.props.addNewNote(this.props.type);
    };

    render({ type, notes, deleteNote, setNoteActive, setNoteText, moveNote }) {
        return (
            <div className={splitClasses([style['note-list'], style[type]])}>
                <div className={style['note-list__container']}>
                    <div className={style['note-list__widget']}>
                        <NoteListDropTarget type={type} moveNote={moveNote}>
                            {notes.map((note, index) => (
                                <Note
                                    key={note.id}
                                    listType={type}
                                    index={index}
                                    note={note}
                                    deleteNote={deleteNote}
                                    setNoteActive={setNoteActive}
                                    setNoteText={setNoteText}
                                    moveNote={moveNote}
                                />
                            ))}
                        </NoteListDropTarget>
                    </div>
                    <div className={style['note-list__footer']}>
                        <h3 className={style['note-list__type']}>{type}</h3>
                        <div className={style['note-list__button-block']}>
                            <button
                                className={splitClasses([
                                    style['note-list__button'],
                                    style[type]
                                ])}
                                onClick={this.addNewNote}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NoteList;
