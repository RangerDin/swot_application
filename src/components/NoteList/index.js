import { h } from 'preact';
import { PureComponent } from 'preact-compat';

import style from './style';
import Note from 'components/Note';
import { splitClasses } from 'utils/className';

class NoteList extends PureComponent {
    constructor(props) {
        super(props);
        this.addNote = this.addNote.bind(this);
    }

    addNote() {
        this.props.onAdd(this.props.name);
    }

    render({ name, className, notes, onDelete, setActive, onChange }) {
        return (
            <div
                className={splitClasses([style['note-list'], style[className]])}
            >
                <div className={style['note-list__container']}>
                    <h3 className={style['note-list__header']}>{name}</h3>
                    <div className={style['note-list__widget']}>
                        <div className={style['note-list__notes']}>
                            {notes.map(note => (
                                <Note
                                    key={note.id}
                                    className={className}
                                    note={note}
                                    listName={name}
                                    onDelete={onDelete}
                                    setActive={setActive}
                                    onChange={onChange}
                                />
                            ))}
                        </div>
                        <button
                            className={splitClasses([
                                style['note-list__add'],
                                className
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

export default NoteList;
