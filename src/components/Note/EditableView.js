import { h, Component } from 'preact';

import style from './style';
import Button from './Button';
import SaveIcon from 'asserts/icons/icons8-save-32.png';
import { splitClasses } from 'utils/className';

export default class EditableNote extends Component {
    componentDidMount() {
        this.noteInput.focus();
    }
    render({ text, listType, deactivateNote, onChange }) {
        return (
            <div className={style['note__view-container']}>
                <textarea
                    className={splitClasses([
                        style[listType],
                        style.note__view,
                        style.note__view_editable
                    ])}
                    ref={input => (this.noteInput = input)}
                    onBlur={deactivateNote}
                    onChange={onChange}
                    value={text}
                />
                <Button onClick={deactivateNote}>
                    <img className={style['note__view-icon']} src={SaveIcon} />
                </Button>
            </div>
        );
    }
}
