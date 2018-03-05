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
                        deleteNote={props.deleteNote}
                        setNoteActive={props.setNoteActive}
                        setNoteText={props.setNoteText}
                        moveNote={props.moveNote}
                        isActive={listType === props.activeNoteList}
                        activateNoteList={props.activateNoteList}
                        setNoteDragging={props.setNoteDragging}
                        isNoteDragging={props.isNoteDragging}
                        resetLastAddedNote={props.resetLastAddedNote}
                        lastAddedNote={props.lastAddedNote}
                    />
                ))}
            </div>
        );
    }
}

export default Main;
