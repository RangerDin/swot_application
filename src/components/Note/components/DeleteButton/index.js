import { h } from 'preact';

import Button from '../Button';

const DeleteButton = ({ ...props }) => (
    <Button title="Delete note (Delete)" {...props}>
        &times;
    </Button>
);

export default DeleteButton;
