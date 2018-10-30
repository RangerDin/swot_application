import { h } from 'preact';
import { PureComponent } from 'preact-compat';
import { Container } from 'react-smooth-dnd';

import style from './style';
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

    getChildPayload = index => {
        return this.props.notes[index];
    };

    onDragStart = ({ isSource }) => {
        this.props.setNoteDragging(true);

        if (isSource) {
            this.props.activateNoteList(this.props.type);
        }
    };

    onDragEnd = () => {
        this.props.setNoteDragging(false);
    };

    render({ className, children, isHighlighted, isMinimized }) {
        const classNames = [style['drop-target'], DNDClasses, className];

        if (isHighlighted) {
            classNames.push(style['drop-target_draggable']);
        }

        if (isMinimized) {
            classNames.push(style['drop-target_minimized']);
        }

        return (
            <Container
                className={splitClasses(classNames)}
                groupName="note-list"
                onClick={this.onClick}
                nonDragAreaSelector=".non-draggable"
                onDrop={this.onDrop}
                onDragStart={this.onDragStart}
                onDragEnd={this.onDragEnd}
                getChildPayload={this.getChildPayload}
                render={renderContainer}
            >
                {children}
            </Container>
        );
    }
}

export default DropTarget;
