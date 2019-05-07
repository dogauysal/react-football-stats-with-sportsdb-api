import React from 'react';

const SidebarMenu = (props) => {
    const items = props.menus.map((menu) => {
        return <a key={menu.id} onClick={(e) => {
            e.preventDefault();
            props.onSidebarClick(menu)
        }} className="nav-link" href="/" role="tab">{menu.title}</a>;
    }) 

    return <div className="nav flex-column nav-pills" role="tablist" aria-orientation="vertical">{items}</div>
}

export default SidebarMenu;