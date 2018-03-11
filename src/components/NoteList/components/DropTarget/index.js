import { h } from 'preact';
import { PureComponent } from 'preact-compat';
import { DropTarget } from 'preact-dnd';

import style from './style';
import { ItemTypes } from 'constants/dnd';
import { splitClasses } from 'utils/className';

class NoteListsDropTarget extends PureComponent {
    onClick = () => {
        this.props.activateNoteList(this.props.type);
    };

    render({ children, connectDropTarget, isHighlighted, isMinimized }) {
        const classes = [style['drop-target']];
        if (isHighlighted) {
            classes.push(style['drop-target_draggable']);
        }
        if (isMinimized) {
            classes.push(style['drop-target_minimized']);
        }

        return connectDropTarget(
            <div className={splitClasses(classes)} onClick={this.onClick}>
                <div className={style['drop-target__container']}>
                    {children}
                </div>
            </div>
        );
    }
}

const target = {
    hover(props, monitor) {
        if (monitor.isOver({ shallow: true })) {
            const draggingNote = monitor.getItem();
            props.moveNote(draggingNote.listType, draggingNote.id, props.type);

            /* note in "drag" state is not updated by itself,
             * so we change its listType manually */
            draggingNote.listType = props.type;
        }
    }
};

const collect = connect => ({
    connectDropTarget: connect.dropTarget()
});

export default DropTarget(ItemTypes.NOTE, target, collect)(NoteListsDropTarget);
