import { ReactNode } from "react";

type TRoute = {
    path: string;
    element: ReactNode;
};

type TAdminSidebar = {
    key: string;
    label: ReactNode;
    children?: TAdminSidebar[];
};

export const routeGenerator = (items ) => {
    const adminRoutes = items.reduce((acc: TRoute[], item) => {
        if (item.path && item.element) {
            acc.push({
                path: item.path,
                element: item.element,
            })
        }
        if (item.children) {
            item.children.forEach((child) => {
                acc.push({
                    path: child.path,
                    element: child.element,
                })
            })
        }
        return acc;
    }, []);

    return adminRoutes;
};