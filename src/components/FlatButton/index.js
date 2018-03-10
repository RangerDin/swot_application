import { h } from 'preact';

import Button from 'components/Button';
import { splitClasses } from 'utils/className';

import style from './style';

const FlatButton = ({ className, ...props }) => {
    return (
        <Button
            className={splitClasses([style['flat-button'], className])}
            {...props}
        />
    );
};

export default FlatButton;
