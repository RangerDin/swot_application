import { h, Component } from 'preact';

import style from './style';
import { splitClasses } from 'utils/className';

export default class EditableNote extends Component {
    componentDidMount() {
        this.noteInput.focus();
    }
    render({ text, listType, onBlur, onChange }) {
        return (
            <textarea
                className={splitClasses([
                    style[listType],
                    style.note__view,
                    style.note__view_editable
                ])}
                ref={input => (this.noteInput = input)}
                onBlur={onBlur}
                onChange={onChange}
                value={text}
            />
        );
    }
}
