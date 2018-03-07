import { h } from 'preact';

import style from './style';
import FooterButton from './FooterButton';
import IconTrash from 'asserts/icons/icons8-trash-32.png';
import { splitClasses } from 'utils/className';

const DeleteButton = ({ onClick, className, disabled }) => (
    <FooterButton
        title="Delete all notes"
        onClick={onClick}
        className={splitClasses([style.button_delete, className])}
        disabled={disabled}
    >
        <img className={style['button__icon']} src={IconTrash} />
    </FooterButton>
);

export default DeleteButton;
