import ContainerComponent from "@/Components/Container";
import NavbarComponent from "@/Components/Navbar";
import { Button } from "@/Components/ui/button";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Toaster } from "@/Components/ui/toaster";
import { Link } from "@inertiajs/react";
import {
  CreditCard,
  Home,
  Info,
  ListChecks,
  Percent,
  UtensilsCrossed,
} from "lucide-react";
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
    route: "admin.dashboard",
    icon: <Home className="w-4 h-4 mr-4" />,
  },
  {
    title: "Verifikasi pembayaran",
    route: "admin.dashboard.payment",
    icon: <CreditCard className="w-4 h-4 mr-4" />,
  },
  {
    title: "Daftar pesanan",
    route: "admin.dashboard.order",
    icon: <ListChecks className="w-4 h-4 mr-4" />,
  },
  {
    title: "Daftar menu",
    route: "admin.dashboard.menu",
    icon: <UtensilsCrossed className="w-4 h-4 mr-4" />,
  },
  {
    title: "Daftar promo",
    route: "admin.dashboard.promo",
    icon: <Percent className="w-4 h-4 mr-4" />,
  },
  {
    title: "Profil restoran",
    route: "admin.dashboard.profile",
    icon: <Info className="w-4 h-4 mr-4" />,
  },
];

export default function DashboardAdminLayout({ children }: Props) {
  return (
    <>
      <NavbarComponent variant="xl" />
      <ContainerComponent variant="xl" className="h-screen grid grid-cols-12">
        <div className="col-span-3 pt-16">
          <ScrollArea className="w-full h-[calc(100vh-4rem)]">
            <div className="flex flex-col gap-1 py-8 pr-4">
              {menus.map((menu, index) => (
                <Button
                  key={"dashboard-admin-navigation-item-" + index}
                  variant={route().current(menu.route) ? "secondary" : "ghost"}
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
      <Toaster />
    </>
  );
}
