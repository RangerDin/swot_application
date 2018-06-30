import { h, Component } from 'preact';
import { DragDropContext } from 'preact-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import MultiBackend, { TouchTransition } from 'react-dnd-multi-backend';
import 'normalize.css';

import { NOTE_LIST_TYPE } from 'constants/note';
import Main from 'components/Main';
import Menu from 'components/Menu';
import Message from 'components/Message';
import NoteListsService from 'services/noteLists';
import FileService from 'services/file';

import style from './style';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            objectOfStudy: null,
            notes: NoteListsService.getInitialState(),
            activeNoteList: NOTE_LIST_TYPE.STRENGTHS,
            message: '',
            isNoteDragging: false,
            isMenuFolded: true
        };
    }

    addNewNote = listType => {
        let newNotes = NoteListsService.addNewNote(this.state.notes, listType);
        const listToAdd = newNotes.lists[listType];
        const addedNoteId = listToAdd[listToAdd.length - 1].id;
        newNotes = NoteListsService.setNoteActive(
            newNotes,
            listType,
            addedNoteId,
            true
        );

        this.setState({
            notes: newNotes
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
        if (targetIndex === undefined && sourceListType === targetListType) {
            return;
        }

        const targetNote = this.state.notes.lists[targetListType][targetIndex];
        if (targetNote && targetNote.id === sourceNoteId) {
            return;
        }

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

    deleteAllNotes = noteListType => {
        this.setState({
            notes: NoteListsService.deleteAllNotesFromList(
                this.state.notes,
                noteListType
            )
        });
    };

    onLoadFile = fileContent => {
        const swot = FileService.loadSWOTFromFile(fileContent);
        if (!swot) {
            this.showMessage('Incorrect file type.');
            return;
        }

        this.setState({
            objectOfStudy: swot.objectOfStudy,
            notes: swot.notes
        });
    };

    onSaveFile = () => {
        FileService.saveSWOTAsFile(this.state.objectOfStudy, this.state.notes);
    };

    activateNoteList = type => {
        if (this.state.activeNoteList !== type) {
            this.setState({
                activeNoteList: type
            });
        }
    };

    setNoteDragging = isDragging => {
        if (isDragging !== this.state.isNoteDragging) {
            this.setState({
                isNoteDragging: isDragging
            });
        }
    };

    showMessage = text => {
        this.setState({
            message: text
        });
    };

    closeMessage = () => {
        this.setState({
            message: ''
        });
    };

    setObjectOfStudy = event => {
        this.setState({
            objectOfStudy: event.target.value
        });
    };

    toggleMenu = () => {
        this.setState({
            isMenuFolded: !this.state.isMenuFolded
        });
    };

    render() {
        return (
            <div className={style.app}>
                <Message
                    text={this.state.message}
                    onClick={this.closeMessage}
                />
                <Menu
                    onLoad={this.onLoadFile}
                    onSave={this.onSaveFile}
                    objectOfStudy={this.state.objectOfStudy}
                    setObjectOfStudy={this.setObjectOfStudy}
                    toggleMenu={this.toggleMenu}
                    isFolded={this.state.isMenuFolded}
                />
                <Main
                    notes={this.state.notes}
                    addNewNote={this.addNewNote}
                    deleteNote={this.deleteNote}
                    moveNote={this.moveNote}
                    setNoteActive={this.setNoteActive}
                    setNoteText={this.setNoteText}
                    activeNoteList={this.state.activeNoteList}
                    activateNoteList={this.activateNoteList}
                    setNoteDragging={this.setNoteDragging}
                    isNoteDragging={this.state.isNoteDragging}
                    deleteAllNotes={this.deleteAllNotes}
                />
            </div>
        );
    }
}

const HTML5ToTouch = {
    backends: [
        {
            backend: HTML5Backend
        },
        {
            backend: TouchBackend({ enableMouseEvents: true }),
            preview: true,
            transition: TouchTransition
        }
    ]
};

export default DragDropContext(MultiBackend(HTML5ToTouch))(App);
