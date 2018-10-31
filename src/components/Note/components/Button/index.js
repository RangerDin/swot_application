import { h } from 'preact';

import Button from 'components/Button';
import { splitClasses } from 'utils/className';

import style from './style';

const NoteButton = ({ className, ...props }) => (
    <Button className={splitClasses([style.button, className])} {...props} />
);

export default NoteButton;
