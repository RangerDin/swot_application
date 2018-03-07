import { h } from 'preact';
import { PureComponent } from 'preact-compat';

import style from './style';
import DeleteButton from './DeleteButton';
import { splitClasses } from 'utils/className';

export default class ReadOnlyView extends PureComponent {
    onKeyDown = event => {
        if (event.key === 'Enter') {
            this.props.activateNote();
            event.preventDefault();
            return;
        }
        if (event.key === 'Delete' && event.ctrlKey) {
            this.props.deleteNote();
            event.preventDefault();
            return;
        }
    };

    render({ listType, children, activateNote, deleteNote }) {
        return (
            <div className={style['note__view-container']}>
                <div
                    tabIndex="0"
                    onKeyDown={this.onKeyDown}
                    className={splitClasses([
                        style[listType],
                        style.note__view
                    ])}
                    onClick={activateNote}
                >
                    {children}
                </div>
                <DeleteButton
                    className={style.note__button}
                    onClick={deleteNote}
                />
            </div>
        );
    }
}
