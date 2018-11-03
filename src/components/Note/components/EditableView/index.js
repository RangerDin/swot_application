import { h, Component } from 'preact';

import { splitClasses } from 'utils/className';

import style from '../../style';
import SaveButton from '../SaveButton';

export default class EditableNote extends Component {
    componentDidMount() {
        this.noteInput.focus();
    }

    onKeyDown = event => {
        if (
            (event.key === 'Enter' && event.ctrlKey) ||
            event.key === 'Escape'
        ) {
            this.props.deactivateNote();
        }
    };

    onBlur = event => {
        if (!event.target.value) {
            this.props.deleteNote();
        } else {
            this.props.deactivateNote();
        }
    };

    render({ text, listType, deactivateNote, onInput }) {
        const containerClassNames = [style.note__container];

        if (!text) {
            containerClassNames.push(style.note__container_new);
        }

        return (
            <div
                onKeyDown={this.onKeyDown}
                className={splitClasses(containerClassNames)}
            >
                <textarea
                    className={splitClasses([
                        style[listType],
                        style.note__view,
                        style.note__view_editable
                    ])}
                    ref={input => (this.noteInput = input)}
                    onBlur={this.onBlur}
                    onInput={onInput}
                    value={text}
                />
                <SaveButton
                    className={splitClasses([
                        style.note__button,
                        style.note__button_save
                    ])}
                    onClick={deactivateNote}
                />
            </div>
        );
    }
}
