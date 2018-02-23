import { h } from 'preact';

import NoteList from 'components/NoteList';
import style from './style';

const exampleNotes = [
    { id: 1, text: 'text 1', is_being_edited: false, is_active: false },
    { id: 2, text: 'text 2', is_being_edited: false, is_active: false },
    { id: 3, text: 'text 3', is_being_edited: false, is_active: false },
    { id: 4, text: 'text 4', is_being_edited: false, is_active: false },
    { id: 5, text: 'text 5', is_being_edited: false, is_active: false }
];

const Main = () => (
    <div className={style.main}>
        <NoteList
            title="Strengths"
            className="note-list_strengths"
            notes={exampleNotes}
        />
        <NoteList
            title="Threats"
            className="note-list_threats"
            notes={exampleNotes}
        />
        <NoteList
            title="Opportunities"
            className="note-list_opportunities"
            notes={exampleNotes}
        />
        <NoteList
            title="Weaknesses"
            className="note-list_weaknesses"
            notes={exampleNotes}
        />
    </div>
);

export default Main;
