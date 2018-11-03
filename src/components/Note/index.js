import { h } from 'preact';
import { PureComponent } from 'preact-compat';
import { Draggable } from 'react-smooth-dnd';

import { splitClasses } from 'utils/className';

import style from './style';
import EditableView from './components/EditableView';
import ReadOnlyView from './components/ReadOnlyView';

class Note extends PureComponent {
    deleteNote = () => {
        this.props.deleteNote(this.props.listType, this.props.note.id);
    };

    activateNote = () => {
        this.props.setNoteActive(this.props.listType, this.props.note.id, true);
    };

    deactivateNote = () => {
        this.props.setNoteActive(
            this.props.listType,
            this.props.note.id,
            false
        );
    };

    setNoteText = event => {
        this.props.setNoteText(
            this.props.listType,
            this.props.note.id,
            event.target.value
        );
    };

    getNoteClasses = (isDragging, isBeingEdited) => {
        let noteClasses = [style.note];

        if (isBeingEdited) {
            noteClasses.push('non-draggable');
        }

        return splitClasses(noteClasses);
    };

    renderEditableView = () => (
        <EditableView
            listType={this.props.listType}
            text={this.props.note.text}
            deactivateNote={this.deactivateNote}
            onInput={this.setNoteText}
            deleteNote={this.deleteNote}
        />
    );

    renderReadOnlyView = () => (
        <ReadOnlyView
            listType={this.props.listType}
            activateNote={this.activateNote}
            deleteNote={this.deleteNote}
        >
            {this.props.note.text}
        </ReadOnlyView>
    );

    renderNoteView = () => {
        if (this.props.note.isBeingEdited) {
            return this.renderEditableView();
        }

        return this.renderReadOnlyView();
    };

    render({ isDragging, listType, note: { id, isBeingEdited } }) {
        return (
            <Draggable
                key={`${id} ${listType}`}
                className={this.getNoteClasses(isDragging, isBeingEdited)}
            >
                {this.renderNoteView()}
            </Draggable>
        );
    }
}

export default Note;
