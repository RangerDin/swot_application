import { h } from 'preact';

import { splitClasses } from 'utils/className';

import style from './style';

const ObjectOfStudy = ({ value, className, onInput }) => (
    <input
        className={splitClasses([style['object-of-study'], className])}
        type="text"
        onInput={onInput}
        placeholder="Enter object of study"
        value={value}
    />
);

export default ObjectOfStudy;
