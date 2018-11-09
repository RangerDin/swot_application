import { h } from 'preact';
import { PureComponent } from 'preact-compat';
import { Draggable } from 'react-smooth-dnd';

import { splitClasses } from 'utils/className';

import style from './style';
import View from './components/View';

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

        if (!isDragging) {
            noteClasses.push(style.note_animated);
        }

        return splitClasses(noteClasses);
    };

    render() {
        return (
            <Draggable
                key={`${this.props.note.id} ${this.props.listType}`}
                className={this.getNoteClasses(
                    this.props.isDragging,
                    this.props.isBeingEdited
                )}
            >
                <View
                    listType={this.props.listType}
                    text={this.props.note.text}
                    activateNote={this.activateNote}
                    deactivateNote={this.deactivateNote}
                    deleteNote={this.deleteNote}
                    setNoteText={this.setNoteText}
                    readOnly={!this.props.note.isBeingEdited}
                />
            </Draggable>
        );
    }
}

export default Note;
