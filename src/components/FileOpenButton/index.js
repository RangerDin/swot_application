import { h, Component } from 'preact';

import { splitClasses } from 'utils/className';

import style from './style';

export default class FileOpenButton extends Component {
    onKeyDown = event => {
        if (event.key === 'Enter') {
            this.input.click();
        }
    };

    saveInputRef = node => (this.input = node);

    render({ title, onChange, className, children }) {
        return (
            <label
                tabIndex="0"
                title={title}
                onKeyDown={this.onKeyDown}
                className={splitClasses([style['file-open-button'], className])}
            >
                {children}
                <input
                    ref={this.saveInputRef}
                    className={style['file-open-button__input']}
                    type="file"
                    onChange={onChange}
                />
            </label>
        );
    }
}
