import { h } from 'preact';
import { PureComponent } from 'preact-compat';

import style from './style';
import NoteListDropTarget from './NoteListDropTarget';
import Footer from './Footer';
import Placeholder from './Placeholder';
import DeleteAllDialog from './DeleteAllDialog';
import Note from 'components/Note';
import { splitClasses } from 'utils/className';

class NoteList extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isDeleteAllDialogShown: false
        };
    }

    addNewNote = () => {
        this.props.addNewNote(this.props.type);
    };

    requestDeleteAllNotes = () => {
        this.showDeleteAllDialog();
    };

    scrollToBottom = () => {
        this.dropTarget.base.scrollTop = this.dropTarget.base.scrollHeight;
    };

    showDeleteAllDialog = () => {
        this.setState({
            isDeleteAllDialogShown: true
        });
    };

    hideDeleteAllDialog = () => {
        this.setState({
            isDeleteAllDialogShown: false
        });
    };

    deleteAllNotesAndCloseDialog = () => {
        this.props.deleteAllNotes(this.props.type);
        this.hideDeleteAllDialog();
    };

    renderNotes = () => {
        return this.props.notes.map((note, index) => (
            <Note
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
            />
        ));
    };

    renderContent = () => {
        if (this.state.isDeleteAllDialogShown) {
            return (
                <DeleteAllDialog
                    type={this.props.type}
                    yesHandler={this.deleteAllNotesAndCloseDialog}
                    noHandler={this.hideDeleteAllDialog}
                />
            );
        }

        if (!this.props.notes.length) {
            return <Placeholder listType={this.props.type} />;
        }

        return this.renderNotes();
    };

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
                            {this.renderContent()}
                        </NoteListDropTarget>
                    </div>
                    {!this.state.isDeleteAllDialogShown && (
                        <Footer
                            type={type}
                            addNewNote={this.addNewNote}
                            requestDeleteAllNotes={this.requestDeleteAllNotes}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default NoteList;
