import { h } from 'preact';
import { PureComponent } from 'preact-compat';

import FileOpenButton from 'components/FileOpenButton';
import { splitClasses } from 'utils/className';

import style from './style';
import itemStyle from './components/Item/style';
import linkStyle from './components/Link/style';
import { LeftItem, RightItem } from './components/Item';
import Link from './components/Link';

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
                <LeftItem title="Open file">
                    <FileOpenButton
                        className={splitClasses([
                            itemStyle.item_interactable,
                            itemStyle.item_padded
                        ])}
                        onChange={this.onChange}
                    >
                        Open
                    </FileOpenButton>
                </LeftItem>
                <LeftItem title="Download file">
                    <Link
                        href="#"
                        className={splitClasses([
                            itemStyle.item_interactable,
                            itemStyle.item_padded
                        ])}
                        onClick={onSave}
                    >
                        Save
                    </Link>
                </LeftItem>
                <RightItem>
                    <Link
                        href="https://icons8.com"
                        tabIndex="-1"
                        className={splitClasses([
                            itemStyle.item_padded,
                            linkStyle.link_legal
                        ])}
                    >
                        Icons by icons8
                    </Link>
                </RightItem>
            </div>
        );
    }
}

export default Menu;
