import { h } from 'preact';

import Button from './Button';

const DeleteButton = ({ className, onClick, disabled }) => (
    <Button
        className={className}
        title="Delete note (Ctrl + Delete)"
        disabled={disabled}
        onClick={onClick}
    >
        &times;
    </Button>
);

export default DeleteButton;
