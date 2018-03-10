import { h } from 'preact';

import IconTrash from 'asserts/icons/icons8-trash-32.png';

import style from 'components/FlatButton/style';
import Button from '../Button';

const DeleteButton = ({ type, className, disabled, onClick }) => (
    <Button
        type={type}
        title="Delete all notes"
        onClick={onClick}
        className={className}
        disabled={disabled}
    >
        <img className={style['flat-button__icon']} src={IconTrash} />
    </Button>
);

export default DeleteButton;
