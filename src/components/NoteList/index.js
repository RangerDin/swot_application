import { h } from 'preact';
import { PureComponent } from 'preact-compat';

import Note from 'components/Note';
import { splitClasses } from 'utils/className';

import style from './style';
import DropTarget from './components/DropTarget';
import Footer from './components/Footer';
import DeleteAllDialog from './components/DeleteAllDialog';

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
                        <DropTarget
                            type={type}
                            moveNote={moveNote}
                            activateNoteList={activateNoteList}
                            isHighlighted={!isActive && isNoteDragging}
                            isMinimized={!isActive}
                        >
                            {this.renderContent()}
                        </DropTarget>
                    </div>
                    {!this.state.isDeleteAllDialogShown && (
                        <Footer
                            isMinimized={!isActive}
                            type={type}
                            addNewNote={this.addNewNote}
                            requestDeleteAllNotes={this.requestDeleteAllNotes}
                            isNoteListEmpty={
                                !this.props.notes || !this.props.notes.length
                            }
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default NoteList;
