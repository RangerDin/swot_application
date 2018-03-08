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

    static saveSWOTAsFile(swot) {
        return FileSaver.saveAs(this.getFile(swot));
    }

    static checkNoteFormat(noteContent) {
        const necessaryNoteKeys = ['id', 'isBeingEdited', 'text'];
        const noteContentKeys = Object.keys(noteContent);
        if (
            necessaryNoteKeys.length === noteContentKeys.length &&
            necessaryNoteKeys.some(key => !(key in noteContent))
        ) {
            return false;
        }

        if (
            typeof noteContent['id'] !== 'number' ||
            typeof noteContent['isBeingEdited'] !== 'boolean' ||
            typeof noteContent['text'] !== 'string'
        ) {
            return false;
        }

        return true;
    }

    static checkNoteListFormat(noteListContent) {
        if (!Array.isArray(noteListContent)) {
            return false;
        }

        if (noteListContent.some(note => !this.checkNoteFormat(note))) {
            return false;
        }

        return true;
    }

    static checkFileContentFormat(content) {
        if (typeof content !== 'object') {
            return false;
        }
        const topContentKeys = Object.keys(content);
        const topNecessaryKeys = ['lists', 'idCounter'];
        if (
            topContentKeys.length !== topNecessaryKeys.length ||
            topNecessaryKeys.some(key => !(key in content))
        ) {
            return false;
        }
        if (
            typeof content['idCounter'] !== 'number' ||
            typeof content['lists'] !== 'object'
        ) {
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
