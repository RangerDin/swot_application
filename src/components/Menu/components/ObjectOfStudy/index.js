import { h } from 'preact';

import { splitClasses } from 'utils/className';

import style from './style';

const ObjectOfStudy = ({ value, className, onChange }) => (
    <input
        className={splitClasses([style['object-of-study'], className])}
        type="text"
        onChange={onChange}
        placeholder="Enter object of study"
        value={value}
    />
);

export default ObjectOfStudy;
