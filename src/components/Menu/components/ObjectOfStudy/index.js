import { h } from 'preact';

import style from './style';

const ObjectOfStudy = ({ value, onChange }) => (
    <input
        className={style['object-of-study']}
        type="text"
        onChange={onChange}
        placeholder="Enter object of study"
        value={value}
    />
);

export default ObjectOfStudy;
