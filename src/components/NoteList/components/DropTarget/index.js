import { h } from 'preact';
import { PureComponent } from 'preact-compat';
import { Container } from 'react-smooth-dnd';

import style from './style';
import noteStyle from 'components/Note/style';
import { splitClasses } from 'utils/className';

const DNDClasses = 'smooth-dnd-container vertical';

const renderContainer = function(setRef) {
    return (
        <div onClick={this.onClick} className={this.className} ref={setRef}>
            {this.children}
        </div>
    );
};

class DropTarget extends PureComponent {
    onClick = () => {
        this.props.activateNoteList(this.props.type);
    };

    onDrop = ({ removedIndex, addedIndex, payload: note }) => {
        if (removedIndex !== null) {
            this.props.deleteNote(this.props.type, note.id);
        }

        if (addedIndex !== null) {
            this.props.addNoteToList(this.props.type, addedIndex, note);
        }
    };

    onDropReady = ({ addedIndex }) => {
        if (addedIndex !== null) {
            this.props.setActiveDropTarget(this.props.type);
        }
    };

    getChildPayload = index => {
        return this.props.notes[index];
    };

    onDragStart = ({ isSource }) => {
        if (isSource) {
            this.props.setNoteDragging(true);
            this.props.activateNoteList(this.props.type);
        }
    };

    onDragEnd = ({ isSource }) => {
        if (isSource) {
            this.props.setNoteDragging(false);
            this.props.setActiveDropTarget(null);
        }
    };

    render({ className, children, isMinimized }) {
        const classNames = [style['drop-target'], DNDClasses, className];

        if (isMinimized) {
            classNames.push(style['drop-target_minimized']);
        }

        return (
            <Container
                className={splitClasses(classNames)}
                groupName="note-list"
                onClick={this.onClick}
                nonDragAreaSelector=".non-draggable"
                dragHandleSelector={'.' + noteStyle.note__view}
                onDrop={this.onDrop}
                onDropReady={this.onDropReady}
                onDragStart={this.onDragStart}
                onDragEnd={this.onDragEnd}
                dragClass={noteStyle.note_drag}
                getChildPayload={this.getChildPayload}
                render={renderContainer}
            >
                {children}
            </Container>
        );
    }
}

export default DropTarget;
