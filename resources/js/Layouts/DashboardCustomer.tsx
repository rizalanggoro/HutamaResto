import Container from "@/Components/Container";
import Navbar from "@/Components/Navbar";
import { Button } from "@/Components/ui/button";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Link } from "@inertiajs/react";
import React from "react";

type Props = {
    children: React.ReactNode;
};

const menus = [
    { title: "Pemesanan baru", href: "/dashboard/order/create" },
    { title: "Pesanan saya", href: "/dashboard/order" },
    { title: "Aduan saya", href: "/dashboard/complaint" },
    { title: "Profil", href: "/dashboard/profile" },
];

export default function DashboardCustomerLayout({ children }: Props) {
    return (
        <>
            <Navbar variant="xl" />
            <Container
                variant="xl"
                className="h-screen grid grid-cols-12 gap-4"
            >
                <div className="col-span-3 border-r pt-16">
                    <ScrollArea className="w-full h-[calc(100vh-4rem)]">
                        <div className="flex flex-col gap-1 py-4 pr-4">
                            {menus.map((menu, index) => (
                                <Button variant={"secondary"} asChild>
                                    <Link href={menu.href}>{menu.title}</Link>
                                </Button>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
                <div className="col-span-9 pt-16">
                    <ScrollArea className="w-full h-[calc(100vh-4rem)]">
                        <div>{children}</div>
                    </ScrollArea>
                </div>
            </Container>
        </>
    );
}
