import React from "react";
import { type SideBarMenuItemTypes } from "../../../types/menu-item-types";
import Item from "./Item";
import { SideBarMenuItems } from "../../../constant/SideBarMenuItems";

const MenuItem = () => {
    return (
        <ul className="space-y-2 font-medium">
            {SideBarMenuItems.map((item: SideBarMenuItemTypes) => (
                <Item
                    key={item.link}
                    title={item.title}
                    link={item.link}
                    icon={item.icon}
                    child={item.child}
                />
            ))}
        </ul>
    );
};

export default MenuItem;
