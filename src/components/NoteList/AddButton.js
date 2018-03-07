import { h } from 'preact';

import FooterButton from './FooterButton';

const AddButton = ({ onClick, className, disabled }) => (
    <FooterButton
        className={className}
        title="Add new note"
        onClick={onClick}
        disabled={disabled}
    >
        +
    </FooterButton>
);

export default AddButton;
