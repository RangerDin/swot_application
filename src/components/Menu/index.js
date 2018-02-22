import { h } from 'preact';

import style from './style';
import { LeftMenuItem, RightMenuItem } from './MenuItem';

const Menu = () => (
    <div className={style.menu}>
        <LeftMenuItem>Open</LeftMenuItem>
        <LeftMenuItem>Save</LeftMenuItem>
        <LeftMenuItem>Save as...</LeftMenuItem>
        <RightMenuItem>About</RightMenuItem>
    </div>
);

export default Menu;
