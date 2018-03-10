import { h } from 'preact';

import style from './style';
import AddButton from './AddButton';
import DeleteNoteButton from 'components/Note/DeleteButton';
import SaveNoteButton from 'components/Note/SaveButton';
import DeleteNoteAllButton from 'components/NoteList/DeleteButton';
import { splitClasses } from 'utils/className';

const Paragraph = ({ children }) => (
    <div className={style.placeholder__paragraph}>{children}</div>
);

const ParagraphWithIllustration = ({ children }) => (
    <div
        className={splitClasses([
            style.placeholder__paragraph,
            style['placeholder__paragraph_with-illustration']
        ])}
    >
        {children}
    </div>
);

const Placeholder = ({ listType }) => (
    <div
        className={splitClasses([
            style['note-list__placeholder'],
            style.placeholder
        ])}
    >
        <div className={style.placeholder__container}>
            <Paragraph>There are no notes yet.</Paragraph>
            <Paragraph>You can use buttons:</Paragraph>
            <ParagraphWithIllustration>
                <AddButton
                    className={splitClasses([
                        style[listType],
                        style.placeholder__button
                    ])}
                    disabled
                />{' '}
                - to create note;
            </ParagraphWithIllustration>
            <ParagraphWithIllustration>
                <DeleteNoteAllButton
                    className={style.placeholder__button}
                    disabled
                />{' '}
                - to delete all notes;
            </ParagraphWithIllustration>
            <ParagraphWithIllustration>
                <DeleteNoteButton
                    className={style.placeholder__button}
                    disabled
                />{' '}
                - to delete note;
            </ParagraphWithIllustration>
            <ParagraphWithIllustration>
                <SaveNoteButton
                    className={style.placeholder__button}
                    disabled
                />{' '}
                - to save note text.
            </ParagraphWithIllustration>
            <Paragraph>
                You can also drag and drop notes between lists.
            </Paragraph>
        </div>
    </div>
);

export default Placeholder;
