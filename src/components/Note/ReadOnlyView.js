import { h } from 'preact';

import style from './style';
import Button from './Button';
import { splitClasses } from 'utils/className';

const ReadOnlyView = ({ listType, children, activateNote, deleteNote }) => (
    <div className={style['note__view-container']}>
        <div
            className={splitClasses([style[listType], style.note__view])}
            onClick={activateNote}
        >
            {children}
        </div>
        <Button onClick={deleteNote}>&times;</Button>
    </div>
);

export default ReadOnlyView;
