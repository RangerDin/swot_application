import Note from 'utils/note';
import { NOTE_LIST_TYPE } from 'constants/note';

export default class NoteListsService {
    static getInitialState() {
        return {
            lists: {
                [NOTE_LIST_TYPE.STRENGTHS]: [],
                [NOTE_LIST_TYPE.THREATS]: [],
                [NOTE_LIST_TYPE.OPPORTUNITIES]: [],
                [NOTE_LIST_TYPE.WEAKNESSES]: []
            },
            idCounter: 0
        };
    }

    static addNewNote(state, noteListType) {
        const newNote = new Note(state.idCounter);
        return {
            ...state,
            lists: {
                ...state.lists,
                [noteListType]: state.lists[noteListType].concat([newNote])
            },
            idCounter: state.idCounter + 1
        };
    }

    static deleteNote(state, noteListType, noteId) {
        const newNoteList = state.lists[noteListType].filter(
            note => note.id !== noteId
        );
        if (!newNoteList) {
            return state;
        }

        return {
            ...state,
            lists: {
                ...state.lists,
                [noteListType]: newNoteList
            }
        };
    }

    static deleteAllNotesFromList(state, noteListType) {
        return {
            ...state,
            lists: {
                ...state.lists,
                [noteListType]: []
            }
        };
    }

    static getNoteIndex(state, noteListType, noteId) {
        return state.lists[noteListType].findIndex(note => note.id === noteId);
    }

    static getNote(state, noteListType, noteId) {
        return state.lists[noteListType].find(note => note.id === noteId);
    }

    static replaceNote(state, noteListType, noteId, newNote) {
        const noteIndex = this.getNoteIndex(state, noteListType, noteId);
        const newNoteList = [
            ...state.lists[noteListType].slice(0, noteIndex),
            newNote,
            ...state.lists[noteListType].slice(noteIndex + 1)
        ];

        return {
            ...state,
            lists: {
                ...state.lists,
                [noteListType]: newNoteList
            }
        };
    }

    static setNoteActive(state, noteListType, noteId, isActive) {
        const noteToReplace = this.getNote(state, noteListType, noteId);

        if (!noteToReplace) {
            return state;
        }

        const newNote = new Note(
            noteToReplace.id,
            noteToReplace.text,
            isActive
        );

        return this.replaceNote(state, noteListType, noteId, newNote);
    }

    static setNoteText(state, noteListType, noteId, newText) {
        const noteToReplace = this.getNote(state, noteListType, noteId);
        if (!noteToReplace) {
            return state;
        }

        const newNote = new Note(
            noteToReplace.id,
            newText,
            noteToReplace.isBeingEdited
        );

        return this.replaceNote(state, noteListType, noteId, newNote);
    }

    static insertNote(state, noteListType, noteIndex, newNote) {
        const newNoteList = [
            ...state.lists[noteListType].slice(0, noteIndex),
            newNote,
            ...state.lists[noteListType].slice(noteIndex)
        ];

        return {
            ...state,
            lists: {
                ...state.lists,
                [noteListType]: newNoteList
            }
        };
    }

    static moveNote(
        state,
        sourceListType,
        sourceNoteId,
        targetListType,
        targetIndex
    ) {
        const sourceNote = this.getNote(state, sourceListType, sourceNoteId);

        if (targetIndex === undefined) {
            const targetNoteListLength = state.lists[targetListType].length;
            if (targetNoteListLength) {
                targetIndex = targetNoteListLength;
            } else {
                targetIndex = 0;
            }
        }

        const stateAfterDelete = this.deleteNote(
            state,
            sourceListType,
            sourceNoteId
        );
        return this.insertNote(
            stateAfterDelete,
            targetListType,
            targetIndex,
            sourceNote
        );
    }
}
