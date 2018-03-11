import { h } from 'preact';

import style from '../../style';

const NoteListType = ({ type }) => (
    <h3 className={style['note-list__type']}>{type}</h3>
);

export default NoteListType;
