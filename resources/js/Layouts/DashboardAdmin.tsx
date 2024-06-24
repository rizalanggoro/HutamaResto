import ContainerComponent from "@/Components/Container";
import NavbarComponent from "@/Components/Navbar";
import { Button } from "@/Components/ui/button";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Separator } from "@/Components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/Components/ui/tooltip";
import { Link } from "@inertiajs/react";
import { Home, Info, ListChecks, UtensilsCrossed } from "lucide-react";
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
    icon: <Home className="w-4 h-4" />,
  },
  // {
  //   title: "Pembayaran",
  //   route: "admin.dashboard.payment",
  //   icon: <CreditCard className="w-4 h-4 mr-4" />,
  // },
  {
    title: "Daftar pesanan",
    route: "admin.dashboard.order",
    icon: <ListChecks className="w-4 h-4" />,
  },
  {
    title: "Daftar menu",
    route: "admin.dashboard.menu",
    icon: <UtensilsCrossed className="w-4 h-4" />,
  },
  // {
  //   title: "Daftar promo",
  //   route: "admin.dashboard.promo",
  //   icon: <Percent className="w-4 h-4" />,
  // },
  {
    title: "Profil restoran",
    route: "admin.dashboard.profile",
    icon: <Info className="w-4 h-4" />,
  },
];

export default function DashboardAdminLayout({ children }: Props) {
  return (
    <>
      <NavbarComponent variant="xl" />
      <ContainerComponent variant="xl" className="h-screen flex">
        <div className="pt-16">
          <ScrollArea className="w-full h-[calc(100vh-4rem)]">
            <div className="flex flex-col py-6 gap-1">
              {menus.map((menu, index) => (
                <Tooltip key={"dashboard-admin-navigation-item-" + index}>
                  <TooltipTrigger asChild>
                    <Button
                      asChild
                      size={"icon"}
                      variant={
                        route().current(menu.route) ? "secondary" : "ghost"
                      }
                    >
                      <Link href={route(menu.route)}>{menu.icon}</Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">{menu.title}</TooltipContent>
                </Tooltip>
              ))}
            </div>
          </ScrollArea>
        </div>
        <Separator orientation="vertical" className="ml-4" />
        <div className="flex-1 pt-16">
          <ScrollArea type="always" className="w-full h-[calc(100vh-4rem)]">
            <div className="p-8">{children}</div>
          </ScrollArea>
        </div>
      </ContainerComponent>
    </>
  );
}
