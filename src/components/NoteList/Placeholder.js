import { h } from 'preact';

import style from './style';
import AddButton from './AddButton';
import DeleteNoteButton from 'components/Note/DeleteButton';
import SaveNoteButton from 'components/Note/SaveButton';
import DeleteNoteAllButton from 'components/NoteList/DeleteButton';
import { splitClasses } from 'utils/className';

const PlaceholderParagraph = ({ children }) => (
    <div className={style.placeholder__paragraph}>{children}</div>
);

const Placeholder = ({ listType }) => (
    <div
        className={splitClasses([
            style['note-list__placeholder'],
            style.placeholder
        ])}
    >
        <PlaceholderParagraph>There are no notes yet.</PlaceholderParagraph>
        <PlaceholderParagraph>
            You can use buttons at the bottom left:
        </PlaceholderParagraph>
        <PlaceholderParagraph>
            <AddButton
                className={splitClasses([
                    style[listType],
                    style.placeholder__button
                ])}
                disabled
            />{' '}
            - to create note;
        </PlaceholderParagraph>
        <PlaceholderParagraph>
            <DeleteNoteAllButton
                className={style.placeholder__button}
                disabled
            />{' '}
            - to delete all notes;
        </PlaceholderParagraph>
        <PlaceholderParagraph>
            <DeleteNoteButton className={style.placeholder__button} disabled />{' '}
            - to delete note;
        </PlaceholderParagraph>
        <PlaceholderParagraph>
            <SaveNoteButton className={style.placeholder__button} disabled /> -
            to save note text.
        </PlaceholderParagraph>
    </div>
);

export default Placeholder;
