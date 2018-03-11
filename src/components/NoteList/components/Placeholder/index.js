import { h } from 'preact';

import DeleteNoteButton from 'components/Note/components/DeleteButton';
import SaveNoteButton from 'components/Note/components/SaveButton';
import { splitClasses } from 'utils/className';

import style from './style';
import AddButton from '../AddButton';
import DeleteAllNotesButton from '../DeleteButton';

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

const Placeholder = ({ className, listType }) => (
    <div className={splitClasses([style.placeholder, className])}>
        <div className={style.placeholder__container}>
            <Paragraph>There are no notes yet.</Paragraph>
            <Paragraph>You can use buttons:</Paragraph>
            <ParagraphWithIllustration>
                <AddButton
                    type={listType}
                    className={style.placeholder__button}
                    disabled
                />{' '}
                - to create note;
            </ParagraphWithIllustration>
            <ParagraphWithIllustration>
                <DeleteAllNotesButton
                    type={listType}
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
