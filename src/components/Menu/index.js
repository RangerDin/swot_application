import { h } from 'preact';
import { PureComponent } from 'preact-compat';

import style from './style';
import { LeftMenuItem } from './MenuItem';
import MenuLink from './MenuLink';
import FileOpenButton from 'components/FileOpenButton';
import { splitClasses } from 'utils/className';

class Menu extends PureComponent {
    onChange = event => {
        if (!event.target.files[0]) {
            return;
        }
        const reader = new FileReader();
        reader.onload = e => {
            this.props.onLoad(e.target.result);
        };
        reader.readAsText(event.target.files[0]);
    };

    render({ onSave }) {
        return (
            <div className={style.menu}>
                <LeftMenuItem title="Open file">
                    <FileOpenButton
                        className={splitClasses([
                            style.menu__item_interactable,
                            style.menu__item_padded
                        ])}
                        onChange={this.onChange}
                    >
                        Open
                    </FileOpenButton>
                </LeftMenuItem>
                <LeftMenuItem title="Download file">
                    <MenuLink
                        href="#"
                        className={splitClasses([
                            style.menu__item_interactable,
                            style.menu__item_padded
                        ])}
                        onClick={onSave}
                    >
                        Save
                    </MenuLink>
                </LeftMenuItem>
            </div>
        );
    }
}

export default Menu;
