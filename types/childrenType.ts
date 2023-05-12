import type { ReactElement, ReactPortal } from "react";

type ReactText = string | number;
type ReactChild = ReactElement | ReactText;
type ReactNode = ReactChild | ReactPortal | boolean | null | undefined;

export interface Props {
  children: ReactNode;
}
