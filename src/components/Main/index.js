import { h, Component } from 'preact';

import NoteList from 'components/NoteList';

import style from './style';

class Main extends Component {
    render(props) {
        return (
            <div className={style.main}>
                {Object.keys(props.notes.lists).map(listType => (
                    <NoteList
                        key={listType}
                        type={listType}
                        notes={props.notes.lists[listType]}
                        addNewNote={props.addNewNote}
                        addNoteToList={props.addNoteToList}
                        deleteNote={props.deleteNote}
                        setNoteActive={props.setNoteActive}
                        setNoteText={props.setNoteText}
                        moveNote={props.moveNote}
                        isActive={listType === props.activeNoteList}
                        activateNoteList={props.activateNoteList}
                        setNoteDragging={props.setNoteDragging}
                        isNoteDragging={props.isNoteDragging}
                        deleteAllNotes={props.deleteAllNotes}
                    />
                ))}
            </div>
        );
    }
}

export default Main;
