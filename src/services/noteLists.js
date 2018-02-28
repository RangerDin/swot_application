import Note from 'utils/note';
import { NOTE_LIST_TYPE } from 'constants/note';

export default class NoteListsService {
    static getInitialState() {
        return {
            notes: {
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
            notes: {
                ...state.notes,
                [noteListType]: state.notes[noteListType].concat([newNote])
            },
            idCounter: state.idCounter + 1
        };
    }

    static deleteNote(state, noteListType, noteId) {
        const newNoteList = state.notes[noteListType].filter(
            note => note.id !== noteId
        );
        return {
            ...state,
            notes: {
                ...state.notes,
                [noteListType]: newNoteList
            }
        };
    }

    static getNoteIndex(state, noteListType, noteId) {
        return state.notes[noteListType].findIndex(note => note.id === noteId);
    }

    static getNote(state, noteListType, noteId) {
        return state.notes[noteListType].find(note => note.id === noteId);
    }

    static replaceNote(state, noteListType, noteId, newNote) {
        const noteIndex = this.getNoteIndex(state, noteListType, noteId);
        const newNoteList = [
            ...state.notes[noteListType].slice(0, noteIndex),
            newNote,
            ...state.notes[noteListType].slice(noteIndex + 1)
        ];

        return {
            ...state,
            notes: {
                ...state.notes,
                [noteListType]: newNoteList
            }
        };
    }

    static setNoteActive(state, noteListType, noteId, isActive) {
        const noteToReplace = this.getNote(state, noteListType, noteId);
        const newNote = new Note(
            noteToReplace.id,
            noteToReplace.text,
            isActive
        );

        return this.replaceNote(state, noteListType, noteId, newNote);
    }

    static setNoteText(state, noteListType, noteId, newText) {
        const noteToReplace = this.getNote(state, noteListType, noteId);
        const newNote = new Note(
            noteToReplace.id,
            newText,
            noteToReplace.isBeingEdited
        );

        return this.replaceNote(state, noteListType, noteId, newNote);
    }

    static insertNote(state, noteListType, noteIndex, newNote) {
        const newNoteList = [
            ...state.notes[noteListType].slice(0, noteIndex),
            newNote,
            ...state.notes[noteListType].slice(noteIndex)
        ];

        return {
            ...state,
            notes: {
                ...state.notes,
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
            const targetNoteListLength = state.notes[targetListType].length;
            if (targetNoteListLength) {
                targetIndex = targetNoteListLength - 1;
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
