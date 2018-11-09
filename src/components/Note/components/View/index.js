import { h, Component } from 'preact';

import { splitClasses } from 'utils/className';
import style from '../../style';
import SaveButton from '../SaveButton';
import DeleteButton from '../DeleteButton';

export default class View extends Component {
    componentDidMount() {
        this.noteInput.focus();
    }

    setRef = input => {
        this.noteInput = input;
    };

    getTextAreaClassName = () => {
        const classNames = [style[this.props.listType], style.note__view];

        if (!this.props.readOnly) {
            classNames.push(style.note__view_editable);
        }

        if (this.props.text) {
            classNames.push(style['note__view_not-empty']);
        }

        return splitClasses(classNames);
    };

    onBlur = event => {
        if (!event.target.value) {
            this.props.deleteNote();
        } else {
            this.props.deactivateNote();
        }
    };

    onKeyDown = event => {
        if (this.props.readOnly && event.key === 'Enter') {
            this.props.activateNote();
            event.preventDefault();
            return;
        }

        if (event.key === 'Delete') {
            this.props.deleteNote();
            event.preventDefault();
            return;
        }

        if (
            (event.key === 'Enter' && event.ctrlKey) ||
            event.key === 'Escape'
        ) {
            this.props.deactivateNote();
            event.preventDefault();
        }
    };

    render() {
        return (
            <div
                className={style['note__container']}
                onKeyDown={this.onKeyDown}
            >
                <textarea
                    title="Click to edit. Drag and drop to move."
                    tabIndex="0"
                    value={this.props.text}
                    ref={this.setRef}
                    onInput={this.props.setNoteText}
                    onClick={this.props.activateNote}
                    onBlur={this.onBlur}
                    className={this.getTextAreaClassName()}
                    readOnly={this.props.readOnly}
                />
                <DeleteButton
                    tabIndex="-1"
                    className={splitClasses([
                        style.note__button,
                        !this.props.readOnly && style.note__button_hidden
                    ])}
                    onClick={this.props.deleteNote}
                />
                <SaveButton
                    tabIndex="-1"
                    className={splitClasses([
                        style.note__button,
                        this.props.readOnly && style.note__button_hidden
                    ])}
                    onClick={this.props.deactivateNote}
                />
            </div>
        );
    }
}
