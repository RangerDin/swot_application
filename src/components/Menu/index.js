import { h } from 'preact';
import { PureComponent } from 'preact-compat';

import FileOpenButton from 'components/FileOpenButton';
import { splitClasses } from 'utils/className';

import style from './style';
import itemStyle from './components/Item/style';
import linkStyle from './components/Link/style';
import { Item } from './components/Item';
import Link from './components/Link';
import ObjectOfStudy from './components/ObjectOfStudy';
import MenuIcon from './components/MenuIcon';

const FileOpenMenuItem = Item(FileOpenButton);
const SaveMenuItem = Item(Link);
const ObjectOfStudyItem = Item(ObjectOfStudy);
const LinkToMySite = Item(Link);
const LinkToIcons8 = Item(Link);

class Menu extends PureComponent {
    constructor(props) {
        super(props);

        this.onFocusIn = this.onFocusIn.bind(this);
        this.onFocusOut = this.onFocusOut.bind(this);
        this.setMenuRef = this.setMenuRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

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

    onFocusIn() {
        if (this.props.isFolded) {
            this.props.openMenu(true);
        }
    }

    onFocusOut(event) {
        if (
            !this.props.isFolded &&
            (!this.menuRef.contains(event.relatedTarget) ||
                !event.relatedTarget)
        ) {
            this.props.closeMenu(true);
        }
        this.props.resetMenuProccessedByFocusFlag();
    }

    setMenuRef(node) {
        this.menuRef = node;
    }

    handleClickOutside(event) {
        if (
            this.menuRef &&
            !this.menuRef.contains(event.target) &&
            !this.props.isFolded
        ) {
            this.props.closeMenu();
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    render({
        onSave,
        objectOfStudy,
        setObjectOfStudy,
        isFolded,
        isProccessedByFocus,
        openMenu,
        closeMenu,
        resetMenuProccessedByFocusFlag
    }) {
        return (
            <div
                className={style.menu}
                ref={this.setMenuRef}
                onFocusIn={this.onFocusIn}
                onFocusOut={this.onFocusOut}
            >
                <MenuIcon
                    isFolded={isFolded}
                    openMenu={openMenu}
                    closeMenu={closeMenu}
                    resetMenuProccessedByFocusFlag={
                        resetMenuProccessedByFocusFlag
                    }
                    isProccessedByFocus={isProccessedByFocus}
                />
                <nav
                    className={splitClasses([
                        style.menu__items,
                        isFolded ? style.menu__items_folded : ''
                    ])}
                >
                    <FileOpenMenuItem
                        className={splitClasses([
                            itemStyle.item_interactable,
                            itemStyle.item_padded,
                            itemStyle.item_content
                        ])}
                        title="Open file"
                        position="left"
                        onChange={this.onChange}
                    >
                        Open
                    </FileOpenMenuItem>
                    <SaveMenuItem
                        href="#"
                        className={splitClasses([
                            itemStyle.item_interactable,
                            itemStyle.item_padded,
                            itemStyle.item_content
                        ])}
                        title="Save file"
                        position="left"
                        onClick={onSave}
                    >
                        Save
                    </SaveMenuItem>
                    <ObjectOfStudyItem
                        value={objectOfStudy}
                        onChange={setObjectOfStudy}
                    />
                    <LinkToMySite
                        href="https://htype.me"
                        tabIndex="-1"
                        target="_blank"
                        className={splitClasses([
                            linkStyle.link_legal,
                            itemStyle.item_content
                        ])}
                        position="right"
                    >
                        Made by h_type.
                    </LinkToMySite>
                    <LinkToIcons8
                        href="https://icons8.com"
                        tabIndex="-1"
                        target="_blank"
                        rel="nofollow"
                        className={splitClasses([
                            linkStyle.link_legal,
                            itemStyle.item_content
                        ])}
                        position="right"
                    >
                        Icons by icons8.
                    </LinkToIcons8>
                </nav>
            </div>
        );
    }
}

export default Menu;
