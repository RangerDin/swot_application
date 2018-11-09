import { h } from 'preact';

import SaveIcon from 'assets/icons/icons8-save-32.png';

import Button from '../Button';

const SaveButton = ({ ...props }) => (
    <Button title="Save note text (Ctrl + Enter)" icon={SaveIcon} {...props} />
);

export default SaveButton;
