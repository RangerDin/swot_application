import { h } from 'preact';

import { splitClasses } from 'utils/className';

import style from './style';

const Placeholder = ({ className, listType }) => (
    <div
        className={splitClasses([
            style.placeholder,
            style[listType],
            className
        ])}
    >
        <div className={style.placeholder__container}>
            There are no notes yet.
        </div>
    </div>
);

export default Placeholder;
