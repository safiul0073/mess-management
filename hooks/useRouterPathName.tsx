import { useRouter } from "next/router";
import { useMemo } from "react";

export const useRouterPathName = (): string => {
    const router = useRouter();

    return useMemo(() => router.asPath, [router]);
};
