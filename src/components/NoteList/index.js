import { h } from 'preact';
import { PureComponent } from 'preact-compat';
import { DropTarget } from 'preact-dnd';

import style from './style';
import Note from 'components/Note';
import { splitClasses } from 'utils/className';
import { ItemTypes } from 'constants/dnd';

class NoteList extends PureComponent {
    constructor(props) {
        super(props);
        this.addNote = this.addNote.bind(this);
    }

    addNote() {
        this.props.onAdd(this.props.type);
    }

    render({ type, notes, onDelete, setActive, onChange }) {
        return this.props.connectDropTarget(
            <div className={splitClasses([style['note-list'], style[type]])}>
                <div className={style['note-list__container']}>
                    <h3 className={style['note-list__header']}>{type}</h3>
                    <div className={style['note-list__widget']}>
                        <div className={style['note-list__notes']}>
                            {notes.map(note => (
                                <Note
                                    key={note.id}
                                    listType={type}
                                    note={note}
                                    onDelete={onDelete}
                                    setActive={setActive}
                                    onChange={onChange}
                                />
                            ))}
                        </div>
                        <button
                            className={splitClasses([
                                style['note-list__add'],
                                style[type]
                            ])}
                            onClick={this.addNote}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const target = {
    drop(props, monitor, component) {
        const note = monitor.getItem();
        props.onMove(note.listType, note.id, props.type);
    }
};

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget()
});

export default DropTarget(ItemTypes.NOTE, target, collect)(NoteList);
