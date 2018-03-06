import { h } from 'preact';
import { PureComponent } from 'preact-compat';

import style from './style';
import NoteListDropTarget from './NoteListDropTarget';
import Footer from './Footer';
import Note from 'components/Note';
import { splitClasses } from 'utils/className';

class NoteList extends PureComponent {
    addNewNote = () => {
        this.props.addNewNote(this.props.type);
    };

    deleteAllNotes = () => {
        this.props.deleteAllNotes(this.props.type);
    };

    scrollToBottom = () => {
        this.dropTarget.base.scrollTop = this.dropTarget.base.scrollHeight;
    };

    saveLastAddedNoteRef = node => {
        if (
            this.props.lastAddedNote &&
            this.props.lastAddedNote.id === node.props.note.id
        ) {
            this.lastAddedNoteRef = node;
        }
    };

    componentWillUpdate() {
        this.lastAddedNoteRef = null;
    }

    componentDidUpdate() {
        if (this.props.lastAddedNote) {
            this.scrollToBottom();
            if (this.lastAddedNoteRef) {
                const note = this.lastAddedNoteRef.props.note;
                this.props.setNoteActive(this.props.type, note.id, true);
            }
            this.props.resetLastAddedNote();
        }
    }

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
        isNoteDragging,
        lastAddedNote,
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
                            ref={node => {
                                this.dropTarget = node;
                            }}
                            type={type}
                            moveNote={moveNote}
                            activateNoteList={activateNoteList}
                            isHighlighted={!isActive && isNoteDragging}
                        >
                            {notes.map((note, index) => (
                                <Note
                                    ref={this.saveLastAddedNoteRef}
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
                                    lastAddedNote={lastAddedNote}
                                />
                            ))}
                        </NoteListDropTarget>
                    </div>
                    <Footer
                        type={type}
                        addNewNote={this.addNewNote}
                        deleteAllNotes={this.deleteAllNotes}
                    />
                </div>
            </div>
        );
    }
}

export default NoteList;
