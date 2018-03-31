import { h } from 'preact';

import style from './style';
import Button from '../Button';

const DeleteAllDialog = ({ type, yesHandler, noHandler }) => (
    <div className={style['delete-all-dialog']}>
        <div className={style['delete-all-dialog__container']}>
            <div className={style['delete-all-dialog__question']}>
                Do you want to delete all {type}?
            </div>
            <div className={style['delete-all-dialog__button-container']}>
                <Button
                    className={style['delete-all-dialog__button']}
                    onClick={yesHandler}
                    type={type}
                >
                    Yes
                </Button>
                <Button
                    className={style['delete-all-dialog__button']}
                    onClick={noHandler}
                    type={type}
                >
                    No
                </Button>
            </div>
        </div>
    </div>
);

export default DeleteAllDialog;
