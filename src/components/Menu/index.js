import { h, Component } from 'preact';

import style from './style';
import { LeftMenuItem } from './MenuItem';
import MenuLink from './MenuLink';
import FileOpenButton from 'components/FileOpenButton';
import FileService from 'services/file';

const SAVED_FILE_NAME = 'swot.json';

class Menu extends Component {
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

    render({ notes }) {
        return (
            <div className={style.menu}>
                <LeftMenuItem>
                    <FileOpenButton
                        className={style.menu__content}
                        onChange={this.onChange}
                    >
                        Open
                    </FileOpenButton>
                </LeftMenuItem>
                <LeftMenuItem>
                    <MenuLink
                        className={style.menu__content}
                        href={FileService.getSaveLink(notes)}
                        download={SAVED_FILE_NAME}
                    >
                        Save
                    </MenuLink>
                </LeftMenuItem>
            </div>
        );
    }
}

export default Menu;
