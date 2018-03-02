import { h } from 'preact';

import style from './style';
import { splitClasses } from 'utils/className';

const FileOpenButton = ({ onChange, className, children }) => (
    <label className={splitClasses([style['file-open-button'], className])}>
        {children}
        <input
            className={style['file-open-button__input']}
            type="file"
            onChange={onChange}
        />
    </label>
);

export default FileOpenButton;
