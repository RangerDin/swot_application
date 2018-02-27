import { h, Component } from 'preact';
import { PureComponent } from 'preact-compat';
import { DragSource } from 'preact-dnd';

import style from './style';
import { splitClasses } from 'utils/className';
import { ItemTypes } from 'constants/dnd';

class EditableNote extends Component {
    componentDidMount() {
        this.noteInput.focus();
    }
    render() {
        return (
            <textarea
                className={splitClasses([
                    style[this.props.listType],
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

const ReadOnlyNote = ({ listType, children, onClick }) => (
    <div
        className={splitClasses([style[listType], style.note__view])}
        onClick={onClick}
    >
        {children}
    </div>
);

class Note extends PureComponent {
    deleteNote = () => {
        this.props.onDelete(this.props.listType, this.props.note.id);
    };

    activateNote = () => {
        this.props.setActive(this.props.listType, this.props.note.id, true);
    };

    deactivateNote = () => {
        this.props.setActive(this.props.listType, this.props.note.id, false);
    };

    changeNoteText = event => {
        this.props.onChange(
            this.props.listType,
            this.props.note.id,
            event.target.value
        );
    };

    render({ note, listType }) {
        return this.props.connectDragSource(
            <div className={style.note}>
                <div className={style['note__view-container']}>
                    {note.isBeingEdited ? (
                        <EditableNote
                            listType={listType}
                            onBlur={this.deactivateNote}
                            onChange={this.changeNoteText}
                            text={note.text}
                        />
                    ) : (
                        <ReadOnlyNote
                            listType={listType}
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

const source = {
    beginDrag(props) {
        return {
            id: props.note.id,
            listType: props.listType
        };
    },
    canDrag(props) {
        return !props.note.isBeingEdited;
    }
};

const collectSource = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
});

export default DragSource(ItemTypes.NOTE, source, collectSource)(Note);
