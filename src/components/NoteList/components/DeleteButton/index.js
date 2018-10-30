import { h } from 'preact';

import IconTrash from 'assets/icons/icons8-trash-32.png';

import Button from '../Button';

const DeleteButton = props => (
    <Button title="Delete all notes" icon={IconTrash} {...props} />
);

export default DeleteButton;
