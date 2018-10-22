import { h } from 'preact';

import { splitClasses } from 'utils/className';

import style from './style';

export const Item = Component => ({
    title,
    children,
    position,
    onClick,
    className,
    ...props
}) => {
    const classNames = [style.item];

    if (className) {
        classNames.push(className);
    }

    if (position) {
        classNames.push(style[`item_position_${position}`]);
    }

    return (
        <Component
            className={splitClasses(classNames)}
            onClick={onClick}
            title={title}
            {...props}
        >
            {children}
        </Component>
    );
};
