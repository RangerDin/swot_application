import { h } from 'preact';

import SaveIcon from 'asserts/icons/icons8-save-32.png';

import style from '../Button/style';
import Button from '../Button';

const SaveButton = ({ className, disabled, onClick }) => (
    <Button
        className={className}
        title="Save note text (Ctrl + Enter)"
        onClick={onClick}
        disabled={disabled}
    >
        <img className={style['button__icon']} src={SaveIcon} />
    </Button>
);

export default SaveButton;
