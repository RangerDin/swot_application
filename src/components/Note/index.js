import { h } from 'preact';
import { PureComponent } from 'preact-compat';
import { DragSource, DropTarget } from 'preact-dnd';

import style from './style';
import EditableView from './EditableView';
import ReadOnlyView from './ReadOnlyView';
import { splitClasses } from 'utils/className';
import { ItemTypes } from 'constants/dnd';

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

    getNoteClasses = isDragging => {
        let noteClasses = [style.note];
        if (isDragging) {
            noteClasses = [style.note, style.note_dragging];
        }

        return splitClasses(noteClasses);
    };

    render({ note, listType, isDragging }) {
        return this.props.connectDragSource(
            this.props.connectDropTarget(
                <div className={this.getNoteClasses(isDragging)}>
                    <div className={style['note__view-container']}>
                        {note.isBeingEdited ? (
                            <EditableView
                                listType={listType}
                                onBlur={this.deactivateNote}
                                onChange={this.setNoteText}
                                text={note.text}
                            />
                        ) : (
                            <ReadOnlyView
                                listType={listType}
                                onClick={this.activateNote}
                            >
                                {note.text}
                            </ReadOnlyView>
                        )}
                        <button
                            className={style.note__close}
                            onClick={this.deleteNote}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )
        );
    }
}

const target = {
    hover(props, monitor) {
        const movingNote = monitor.getItem();
        if (movingNote.id === props.note.id) {
            return;
        }

        props.moveNote(
            movingNote.listType,
            movingNote.id,
            props.listType,
            props.index
        );

        /* note in "drag" state is not updated by itself,
         * so we change its listType manually */
        movingNote.listType = props.listType;
    }
};

const collectTarget = connect => ({
    connectDropTarget: connect.dropTarget()
});

const source = {
    beginDrag(props) {
        props.setNoteDragging(true);
        props.activateNoteList(props.listType);

        return {
            id: props.note.id,
            listType: props.listType,
            index: props.index
        };
    },
    canDrag(props) {
        return !props.note.isBeingEdited;
    },
    isDragging(props, monitor) {
        return props.note.id === monitor.getItem().id;
    },
    endDrag(props) {
        props.setNoteDragging(false);
    }
};

const collectSource = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
});

export default DropTarget(ItemTypes.NOTE, target, collectTarget)(
    DragSource(ItemTypes.NOTE, source, collectSource)(Note)
);
