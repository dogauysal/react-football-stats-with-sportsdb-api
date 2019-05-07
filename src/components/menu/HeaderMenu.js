import React from 'react';

const HeaderMenu = (props) => {
    let headerClass = "item";

    const items = props.menus.map((menu) => {
        return <a onClick={(e) => {
            e.preventDefault();
            props.onMenuClick(menu)
        }} key={menu.id} className={headerClass} href="/">{menu.title}</a>;
    })

    return <div className="ui small menu">{items}</div>
}

export default HeaderMenu;