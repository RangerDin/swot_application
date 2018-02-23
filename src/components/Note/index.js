import { h } from 'preact';

import style from './style';

const Note = ({ note, className }) => (
    <div className={style.note}>
        <input
            className={[style.note__input, style[className]].join(' ')}
            type="text"
            value={note.text}
        />
        <button className={style.note__close}>&times;</button>
    </div>
);

export default Note;
