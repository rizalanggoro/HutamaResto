import ContainerComponent from "@/Components/Container";
import NavbarComponent from "@/Components/Navbar";
import {Button} from "@/Components/ui/button";
import {ScrollArea} from "@/Components/ui/scroll-area";
import {Toaster} from "@/Components/ui/toaster";
import {Link} from "@inertiajs/react";
import {Home, ListChecks} from "lucide-react";
import React from "react";

type Props = {
    children: React.ReactNode;
};

const menus: {
    title: string;
    route: string;
    icon: React.ReactNode;
}[] = [
    {
        title: "Halaman utama",
        route: "superadmin.dashboard",
        icon: <Home className="w-4 h-4 mr-4"/>,
    },
    {
        title: "Daftar waralaba",
        route: "superadmin.dashboard.franchise",
        icon: <ListChecks className="w-4 h-4 mr-4"/>,
    },
];

export default function DashboardSuperAdminLayout({children}: Props) {
    return (
        <>
            <NavbarComponent variant="xl"/>
            <ContainerComponent variant="xl" className="h-screen grid grid-cols-12">
                <div className="col-span-3 pt-16">
                    <ScrollArea className="w-full h-[calc(100vh-4rem)]">
                        <div className="flex flex-col gap-1 py-8 pr-4">
                            {menus.map((menu, index) => (
                                <Button
                                    key={
                                        "dashboard-admin-navigation-item-" +
                                        index
                                    }
                                    variant={
                                        route().current(menu.route)
                                            ? "secondary"
                                            : "link"
                                    }
                                    asChild
                                    className="justify-start"
                                >
                                    <Link href={route(menu.route)}>
                                        {menu.icon}
                                        {menu.title}
                                    </Link>
                                </Button>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
                <div className="col-span-9 pt-16">
                    <ScrollArea className="w-full h-[calc(100vh-4rem)]">
                        <div className="pl-4">{children}</div>
                    </ScrollArea>
                </div>
            </ContainerComponent>
            <Toaster/>
        </>
    );
}
