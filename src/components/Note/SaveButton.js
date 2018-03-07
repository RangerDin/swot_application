import { h } from 'preact';

import style from './style';
import Button from './Button';
import SaveIcon from 'asserts/icons/icons8-save-32.png';

const SaveButton = ({ className, disabled, onClick }) => (
    <Button
        className={className}
        title="Save note text (Ctrl + Enter)"
        onClick={onClick}
        disabled={disabled}
    >
        <img className={style['note__view-icon']} src={SaveIcon} />
    </Button>
);

export default SaveButton;
