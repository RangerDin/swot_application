import { h, Component } from 'preact';

import NoteList from 'components/NoteList';
import style from './style';
import NoteListsService from 'services/noteLists';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = NoteListsService.getInitialState();

        this.onAdd = this.onAdd.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.setActive = this.setActive.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onMove = this.onMove.bind(this);
    }

    onAdd(listType) {
        this.setState(NoteListsService.addNewNote(this.state, listType));
    }

    onDelete(listType, noteId) {
        this.setState(
            NoteListsService.deleteNote(this.state, listType, noteId)
        );
    }

    setActive(listType, noteId, isActive) {
        this.setState(
            NoteListsService.setNoteActive(
                this.state,
                listType,
                noteId,
                isActive
            )
        );
    }

    onMove(sourceListType, sourceNoteId, targetListType, targetIndex) {
        this.setState(
            NoteListsService.moveNote(
                this.state,
                sourceListType,
                sourceNoteId,
                targetListType,
                targetIndex
            )
        );
    }

    onChange(noteListType, noteId, newText) {
        this.setState(
            NoteListsService.setNoteText(
                this.state,
                noteListType,
                noteId,
                newText
            )
        );
    }

    render(props, state) {
        return (
            <div className={style.main}>
                {Object.keys(this.state.notes).map(listType => (
                    <NoteList
                        key={listType}
                        type={listType}
                        notes={state.notes[listType]}
                        onAdd={this.onAdd}
                        onDelete={this.onDelete}
                        setActive={this.setActive}
                        onChange={this.onChange}
                        onMove={this.onMove}
                    />
                ))}
            </div>
        );
    }
}

export default Main;
