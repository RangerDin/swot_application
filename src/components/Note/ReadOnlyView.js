import { h } from 'preact';

import style from './style';
import { splitClasses } from 'utils/className';

const ReadOnlyView = ({ listType, children, onClick }) => (
    <div
        className={splitClasses([style[listType], style.note__view])}
        onClick={onClick}
    >
        {children}
    </div>
);

export default ReadOnlyView;
