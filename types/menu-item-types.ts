import { type ReactElement } from "react";

export interface subMenuType {
    title: string;
    link: string;
}

export interface SideBarMenuItemTypes {
    title: string;
    link: string;
    icon?: ReactElement;
    child?: subMenuType[];
}
