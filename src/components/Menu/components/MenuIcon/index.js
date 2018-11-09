import { h } from 'preact';
import { PureComponent } from 'preact-compat';

import style from './style';
import { splitClasses } from 'utils/className';

export default class MenuIcon extends PureComponent {
    onClick = () => {
        if (this.props.isProccessedByFocus) {
            this.props.resetMenuProccessedByFocusFlag();
            return;
        }

        if (this.props.isFolded) {
            this.props.openMenu();
        } else {
            this.props.closeMenu();
        }
    };

    render() {
        return (
            <div
                className={splitClasses([
                    style.icon,
                    this.props.isFolded ? style.folded : style.unfolded
                ])}
                onClick={this.onClick}
                tabIndex="0"
            />
        );
    }
}
