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

    render({
        type,
        notes,
        deleteNote,
        setNoteActive,
        setNoteText,
        moveNote,
        isActive,
        activateNoteList,
        setNoteDragging,
        isNoteDragging
    }) {
        const noteListClasses = [style['note-list'], style[type]];
        noteListClasses.push(
            style[isActive ? 'note-list_active' : 'note-list_minimized']
        );

        return (
            <div className={splitClasses(noteListClasses)}>
                <div className={style['note-list__container']}>
                    <div className={style['note-list__widget']}>
                        <NoteListDropTarget
                            type={type}
                            moveNote={moveNote}
                            activateNoteList={activateNoteList}
                            isHighlighted={!isActive && isNoteDragging}
                        >
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
                                    setNoteDragging={setNoteDragging}
                                    activateNoteList={activateNoteList}
                                />
                            ))}
                        </NoteListDropTarget>
                    </div>
                    <div className={style['note-list__footer']}>
                        <h3
                            onClick={this.onListTypeClick}
                            className={style['note-list__type']}
                        >
                            {type}
                        </h3>
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
