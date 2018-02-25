export default class Note {
    constructor(id, text = '', isBeingEdited = false) {
        this.id = id;
        this.text = text;
        this.isBeingEdited = isBeingEdited;
    }
}
