import { h, Component } from 'preact';
import { PureComponent } from 'preact-compat';

import style from './style';
import { splitClasses } from 'utils/className';

class EditableNote extends Component {
    componentDidMount() {
        this.noteInput.focus();
    }
    render() {
        return (
            <textarea
                className={splitClasses([
                    style[this.props.className],
                    style.note__view,
                    style.note__view_editable
                ])}
                ref={input => (this.noteInput = input)}
                onBlur={this.props.onBlur}
                onChange={this.props.onChange}
                value={this.props.text}
            />
        );
    }
}

const ReadOnlyNote = ({ className, children, onClick }) => (
    <div
        className={splitClasses([style[className], style.note__view])}
        onClick={onClick}
    >
        {children}
    </div>
);

class Note extends PureComponent {
    constructor(props) {
        super(props);
        this.deleteNote = this.deleteNote.bind(this);
        this.activateNote = this.activateNote.bind(this);
        this.deactivateNote = this.deactivateNote.bind(this);
        this.changeNoteText = this.changeNoteText.bind(this);
    }

    deleteNote() {
        this.props.onDelete(this.props.listName, this.props.note.id);
    }

    activateNote() {
        this.props.setActive(this.props.listName, this.props.note.id, true);
    }

    deactivateNote() {
        this.props.setActive(this.props.listName, this.props.note.id, false);
    }

    changeNoteText(event) {
        this.props.onChange(
            this.props.listName,
            this.props.note.id,
            event.target.value
        );
    }

    render({ note, className }) {
        return (
            <div className={style.note}>
                <div className={style['note__view-container']}>
                    {note.isBeingEdited ? (
                        <EditableNote
                            className={className}
                            onBlur={this.deactivateNote}
                            onChange={this.changeNoteText}
                            text={note.text}
                        />
                    ) : (
                        <ReadOnlyNote
                            className={className}
                            onClick={this.activateNote}
                        >
                            {note.text}
                        </ReadOnlyNote>
                    )}
                    <button
                        className={style.note__close}
                        onClick={this.deleteNote}
                    >
                        &times;
                    </button>
                </div>
            </div>
        );
    }
}

export default Note;
