import { h } from 'preact';

import { splitClasses } from 'utils/className';

import style from './style';
import Button from '../Button';

const AddButton = ({ type, className, disabled, onClick }) => (
    <Button
        type={type}
        className={splitClasses([style.button_add, className])}
        title="Add new note"
        onClick={onClick}
        disabled={disabled}
    >
        +
    </Button>
);

export default AddButton;
