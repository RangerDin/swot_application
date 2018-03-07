import { h } from 'preact';
import { PureComponent } from 'preact-compat';

import style from './style';
import NoteListDropTarget from './NoteListDropTarget';
import Footer from './Footer';
import Placeholder from './Placeholder';
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

    renderNotes = () => {
        return this.props.notes.map((note, index) => (
            <Note
                ref={this.saveLastAddedNoteRef}
                key={note.id}
                listType={this.props.type}
                index={index}
                note={note}
                deleteNote={this.props.deleteNote}
                setNoteActive={this.props.setNoteActive}
                setNoteText={this.props.setNoteText}
                moveNote={this.props.moveNote}
                setNoteDragging={this.props.setNoteDragging}
                activateNoteList={this.props.activateNoteList}
                lastAddedNote={this.props.lastAddedNote}
            />
        ));
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

    render({ type, moveNote, isActive, activateNoteList, isNoteDragging }) {
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
                            {this.props.notes.length ? (
                                this.renderNotes()
                            ) : (
                                <Placeholder listType={type} />
                            )}
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
