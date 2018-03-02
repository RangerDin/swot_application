import { h, Component } from 'preact';
import { DragDropContext } from 'preact-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import 'normalize.css';

import style from './style';
import Main from 'components/Main';
import Menu from 'components/Menu';
import NoteListsService from 'services/noteLists';
import FileService from 'services/file';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: NoteListsService.getInitialState()
        };
    }

    addNewNote = listType => {
        this.setState({
            notes: NoteListsService.addNewNote(this.state.notes, listType)
        });
    };

    deleteNote = (listType, noteId) => {
        this.setState({
            notes: NoteListsService.deleteNote(
                this.state.notes,
                listType,
                noteId
            )
        });
    };

    setNoteActive = (listType, noteId, isActive) => {
        this.setState({
            notes: NoteListsService.setNoteActive(
                this.state.notes,
                listType,
                noteId,
                isActive
            )
        });
    };

    moveNote = (sourceListType, sourceNoteId, targetListType, targetIndex) => {
        this.setState({
            notes: NoteListsService.moveNote(
                this.state.notes,
                sourceListType,
                sourceNoteId,
                targetListType,
                targetIndex
            )
        });
    };

    setNoteText = (noteListType, noteId, newText) => {
        this.setState({
            notes: NoteListsService.setNoteText(
                this.state.notes,
                noteListType,
                noteId,
                newText
            )
        });
    };

    onLoadFile = fileContent => {
        const notes = FileService.loadSWOTFromFile(fileContent);
        if (!notes) {
            return;
        }

        this.setState({
            notes
        });
    };

    render() {
        return (
            <div className={style.app}>
                <Menu notes={this.state.notes} onLoad={this.onLoadFile} />
                <Main
                    notes={this.state.notes}
                    addNewNote={this.addNewNote}
                    deleteNote={this.deleteNote}
                    moveNote={this.moveNote}
                    setNoteActive={this.setNoteActive}
                    setNoteText={this.setNoteText}
                />
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(App);
