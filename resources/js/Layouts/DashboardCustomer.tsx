import Container from "@/Components/Container";
import Navbar from "@/Components/Navbar";
import { Button } from "@/Components/ui/button";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Toaster } from "@/Components/ui/toaster";
import { Link } from "@inertiajs/react";
import { Flag, Home, ListChecks, UserRound } from "lucide-react";
import React from "react";

type Props = {
    children: React.ReactNode;
};

const menus = [
    {
        title: "Halaman utama",
        route: "dashboard",
        icon: <Home className="w-4 h-4 mr-4" />,
    },
    {
        title: "Pesanan saya",
        route: "dashboard.order",
        icon: <ListChecks className="w-4 h-4 mr-4" />,
    },
    {
        title: "Pengaduan saya",
        route: "dashboard.order",
        icon: <Flag className="w-4 h-4 mr-4" />,
    },
    {
        title: "Profil saya",
        route: "dashboard.profile",
        icon: <UserRound className="w-4 h-4 mr-4" />,
    },
];

export default function DashboardCustomerLayout({ children }: Props) {
    return (
        <>
            <Navbar variant="xl" />
            <Container variant="xl" className="h-screen grid grid-cols-12">
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
            </Container>
            <Toaster />
        </>
    );
}
