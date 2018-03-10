import { h } from 'preact';

import { splitClasses } from 'utils/className';

import style from './style';

export const Item = ({ title, children, onClick, className }) => (
    <div
        className={splitClasses([style.item, className])}
        onClick={onClick}
        title={title}
    >
        {children}
    </div>
);

export const LeftItem = ({ title, children, onClick }) => (
    <Item title={title} className={style.item_left} onClick={onClick}>
        {children}
    </Item>
);

export const RightItem = ({ title, children, onClick }) => (
    <Item title={title} className={style.item_right} onClick={onClick}>
        {children}
    </Item>
);
