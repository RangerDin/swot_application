import { h, Component } from 'preact';

import NoteList from 'components/NoteList';
import style from './style';
import Note from 'utils/note';
import { STRENGTHS, THREATS, OPPORTUNITIES, WEAKNESSES } from 'constants/note';

const noteLists = [
    {
        name: STRENGTHS,
        className: 'note-list_strengths'
    },
    {
        name: THREATS,
        className: 'note-list_threats'
    },
    {
        name: OPPORTUNITIES,
        className: 'note-list_opportunities'
    },
    {
        name: WEAKNESSES,
        className: 'note-list_weaknesses'
    }
];

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: {
                [STRENGTHS]: [],
                [THREATS]: [],
                [OPPORTUNITIES]: [],
                [WEAKNESSES]: []
            },
            idCounter: 0
        };

        this.onAdd = this.onAdd.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.setActive = this.setActive.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onAdd(listName) {
        const newNote = new Note(this.state.idCounter);
        this.setState({
            ...this.state,
            notes: {
                ...this.state.notes,
                [listName]: this.state.notes[listName].concat([newNote])
            },
            idCounter: this.state.idCounter + 1
        });
    }

    onDelete(listName, id) {
        const newNoteList = this.state.notes[listName].filter(
            note => note.id !== id
        );
        this.setState({
            ...this.state,
            notes: {
                ...this.state.notes,
                [listName]: newNoteList
            }
        });
    }

    getNoteIndexById(listName, id) {
        return this.state.notes[listName].findIndex(note => note.id === id);
    }

    replaceNoteByIndex(listName, index, newNote) {
        const newNoteList = [
            ...this.state.notes[listName].slice(0, index),
            newNote,
            ...this.state.notes[listName].slice(index + 1)
        ];

        this.setState({
            ...this.state,
            notes: {
                ...this.state.notes,
                [listName]: newNoteList
            }
        });
    }

    setActive(listName, id, isActive) {
        const indexOfNoteToReplace = this.getNoteIndexById(listName, id);
        const noteToReplace = this.state.notes[listName][indexOfNoteToReplace];
        const newNote = new Note(
            noteToReplace.id,
            noteToReplace.text,
            isActive
        );

        this.replaceNoteByIndex(listName, indexOfNoteToReplace, newNote);
    }

    onChange(listName, id, newText) {
        const indexOfNoteToReplace = this.getNoteIndexById(listName, id);
        const noteToReplace = this.state.notes[listName][indexOfNoteToReplace];
        const newNote = new Note(
            noteToReplace.id,
            newText,
            noteToReplace.isBeingEdited
        );

        this.replaceNoteByIndex(listName, indexOfNoteToReplace, newNote);
    }

    render(props, state) {
        return (
            <div className={style.main}>
                {noteLists.map(list => (
                    <NoteList
                        key={list.name}
                        name={list.name}
                        className={list.className}
                        notes={state.notes[list.name]}
                        onAdd={this.onAdd}
                        onDelete={this.onDelete}
                        setActive={this.setActive}
                        onChange={this.onChange}
                    />
                ))}
            </div>
        );
    }
}

export default Main;
