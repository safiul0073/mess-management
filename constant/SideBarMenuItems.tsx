/* eslint-disable react/react-in-jsx-scope */
import { type SideBarMenuItemTypes } from "../types/menu-item-types";
import { BiSolidDashboard, BiUser, BiLogOut } from "react-icons/bi";
export const SideBarMenuItems: SideBarMenuItemTypes[] = [
    {
        title: "Dashboard",
        link: "/",
        icon: <BiSolidDashboard />,
    },
    {
        title: "User",
        link: "/users",
        icon: <BiUser />,
    },
    {
        title: "Logout",
        link: "/auth/logout",
        icon: <BiLogOut />,
    },
];
