import { h, Component } from 'preact';
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
            activeDropTarget: null,
            message: '',
            isNoteDragging: false,
            isMenuFolded: true,
            isMenuProccessedByFocus: false
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

    addNoteToList = (targetListType, targetIndex, note) => {
        const newNotes = NoteListsService.insertNote(
            this.state.notes,
            targetListType,
            targetIndex,
            note
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

    setActiveDropTarget = type => {
        this.setState({
            activeDropTarget: type
        });
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

    openMenu = isMenuProccessedByFocus => {
        this.setState({
            isMenuFolded: false,
            isMenuProccessedByFocus
        });
    };

    closeMenu = isMenuProccessedByFocus => {
        this.setState({
            isMenuFolded: true,
            isMenuProccessedByFocus
        });
    };

    resetMenuProccessedByFocusFlag = () => {
        this.setState({
            isMenuProccessedByFocus: false
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
                    openMenu={this.openMenu}
                    closeMenu={this.closeMenu}
                    resetMenuProccessedByFocusFlag={
                        this.resetMenuProccessedByFocusFlag
                    }
                    isFolded={this.state.isMenuFolded}
                    isProccessedByFocus={this.state.isMenuProccessedByFocus}
                />
                <Main
                    notes={this.state.notes}
                    addNewNote={this.addNewNote}
                    addNoteToList={this.addNoteToList}
                    deleteNote={this.deleteNote}
                    moveNote={this.moveNote}
                    setNoteActive={this.setNoteActive}
                    setNoteText={this.setNoteText}
                    activeNoteList={this.state.activeNoteList}
                    activeDropTarget={this.state.activeDropTarget}
                    activateNoteList={this.activateNoteList}
                    setNoteDragging={this.setNoteDragging}
                    setActiveDropTarget={this.setActiveDropTarget}
                    isNoteDragging={this.state.isNoteDragging}
                    deleteAllNotes={this.deleteAllNotes}
                />
            </div>
        );
    }
}

export default App;
