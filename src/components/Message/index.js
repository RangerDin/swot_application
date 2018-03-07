import { h } from 'preact';

import style from './style';

const Message = ({ text, onClick }) => {
    if (!text) {
        return null;
    }

    return (
        <div className={style.message}>
            <div className={style.message__container}>
                <div className={style.message__text}>{text}</div>
                <button onClick={onClick} className={style.message__button}>
                    Ok
                </button>
            </div>
        </div>
    );
};

export default Message;
