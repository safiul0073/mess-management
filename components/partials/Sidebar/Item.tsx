import React from "react";
import { type SideBarMenuItemTypes } from "../../../types/menu-item-types";
import Link from "next/link";

const Item = ({ title, link, icon, child }: SideBarMenuItemTypes) => {
    return (
        <li>
            <Link
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                href={link}
            >
                {icon}
                <span className="ml-3">{title}</span>
            </Link>
        </li>
    );
};

export default Item;
