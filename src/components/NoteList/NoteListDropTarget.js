import { h } from 'preact';
import { PureComponent } from 'preact-compat';
import { DropTarget } from 'preact-dnd';

import style from './style';
import { ItemTypes } from 'constants/dnd';

class NoteListsDropTarget extends PureComponent {
    render({ children, connectDropTarget }) {
        return connectDropTarget(
            <div className={style['note-list__drop-target']}>{children}</div>
        );
    }
}

const target = {
    hover(props, monitor) {
        if (monitor.isOver({ shallow: true })) {
            const draggingNote = monitor.getItem();
            props.onMove(draggingNote.listType, draggingNote.id, props.type);

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
