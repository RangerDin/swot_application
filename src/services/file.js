import { NOTE_LIST_TYPE } from 'constants/note';
import FileSaver from 'file-saver';

const FILE_NAME = 'swot.json';

export default class FileService {
    static isSupported() {
        const FileAPIObjectNames = ['File', 'FileReader', 'Blob', 'FileList'];
        return FileAPIObjectNames.every(name => name in window);
    }

    static getFile(swot) {
        return new File([JSON.stringify(swot)], FILE_NAME, {
            type: 'application/json;charset=utf-8'
        });
    }

    static saveSWOTAsFile(objectOfStudy, notes) {
        return FileSaver.saveAs(
            this.getFile({
                objectOfStudy,
                notes
            })
        );
    }

    static checkObjectKeys(object, keys) {
        if (Object.keys(object).length !== keys.length) {
            return false;
        }

        if (
            keys.some(
                ({ name, type }) =>
                    !(name in object && typeof object[name] === type)
            )
        ) {
            return false;
        }

        return true;
    }

    static checkFileContentFormat(content) {
        if (typeof content !== 'object') {
            return false;
        }

        const fileFormat = [
            { name: 'objectOfStudy', type: 'string' },
            { name: 'notes', type: 'object' }
        ];

        if (!this.checkObjectKeys(content, fileFormat)) {
            return false;
        }

        return this.checkNotesFormat(content['notes']);
    }

    static checkNotesFormat(content) {
        const notesFormat = [
            { name: 'idCounter', type: 'number' },
            { name: 'lists', type: 'object' }
        ];

        if (!this.checkObjectKeys(content, notesFormat)) {
            return false;
        }

        const contentListTypes = Object.keys(content['lists']);
        const necessaryListTypes = Object.keys(NOTE_LIST_TYPE);
        if (
            contentListTypes.length === necessaryListTypes.length &&
            necessaryListTypes.some(key => {
                const listType = NOTE_LIST_TYPE[key];
                return !(
                    listType in content['lists'] &&
                    this.checkNoteListFormat(content['lists'][listType])
                );
            })
        ) {
            return false;
        }

        return true;
    }

    static checkNoteListFormat(content) {
        if (!Array.isArray(content)) {
            return false;
        }

        if (content.some(note => !this.checkNoteFormat(note))) {
            return false;
        }

        return true;
    }

    static checkNoteFormat(noteContent) {
        const noteFormat = [
            {
                name: 'id',
                type: 'number'
            },
            {
                name: 'isBeingEdited',
                type: 'boolean'
            },
            {
                name: 'text',
                type: 'string'
            }
        ];

        return this.checkObjectKeys(noteContent, noteFormat);
    }

    static loadSWOTFromFile(fileContent) {
        try {
            const parsedFileContent = JSON.parse(fileContent);
            if (!this.checkFileContentFormat(parsedFileContent)) {
                return null;
            }
            return parsedFileContent;
        } catch (error) {
            return null;
        }
    }
}
