import { h } from 'preact';

import style from './style';

const EditableNote = ({ className, children }) => (
    <div className={style['note__view-container']}>
        <textarea
            className={[
                style[className],
                style.note__view,
                style.note__view_editable
            ].join(' ')}
        >
            {children}
        </textarea>
        <button className={style.note__close}>&times;</button>
    </div>
);

const ReadOnlyNote = ({ className, children }) => (
    <div className={style['note__view-container']}>
        <div className={[style[className], style.note__view].join(' ')}>
            {children}
        </div>
        <button className={style.note__close}>&times;</button>
    </div>
);

const Note = ({ note, className }) => {
    return (
        <div className={style.note}>
            {note.is_being_edited ? (
                <EditableNote className={className}>{note.text}</EditableNote>
            ) : (
                <ReadOnlyNote className={className}>{note.text}</ReadOnlyNote>
            )}
        </div>
    );
};

export default Note;
