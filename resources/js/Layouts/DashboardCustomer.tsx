import ContainerComponent from "@/Components/Container";
import NavbarComponent from "@/Components/Navbar";
import { Button } from "@/Components/ui/button";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Separator } from "@/Components/ui/separator";
import { Toaster } from "@/Components/ui/toaster";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/Components/ui/tooltip";
import { Link } from "@inertiajs/react";
import { Flag, Home, ListChecks, UserRound } from "lucide-react";
import { PropsWithChildren } from "react";

const menus = [
  {
    title: "Halaman utama",
    route: "dashboard",
    icon: <Home className="w-4 h-4" />,
  },
  {
    title: "Pesanan saya",
    route: "dashboard.order",
    icon: <ListChecks className="w-4 h-4" />,
  },
  {
    title: "Pengaduan saya",
    route: "dashboard.complaint",
    icon: <Flag className="w-4 h-4" />,
  },
  {
    title: "Profil saya",
    route: "dashboard.profile",
    icon: <UserRound className="w-4 h-4" />,
  },
];

export default function DashboardCustomerLayout({
  children,
}: PropsWithChildren) {
  return (
    <>
      <NavbarComponent variant="xl" />

      <ContainerComponent variant="xl" className="h-screen flex">
        <div className="pt-16">
          <ScrollArea className="w-full h-[calc(100vh-4rem)]">
            <div className="flex flex-col gap-1 py-6 pr-4">
              {menus.map((menu, index) => (
                <Tooltip key={"dashboard-admin-navigation-item-" + index}>
                  <TooltipTrigger asChild>
                    <Button
                      size={"icon"}
                      variant={
                        route().current(menu.route) ? "secondary" : "ghost"
                      }
                      asChild
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
        <Separator orientation="vertical" />
        <div className="pt-16">
          <ScrollArea className="w-full h-[calc(100vh-4rem)]">
            <div className="p-8">{children}</div>
          </ScrollArea>
        </div>
      </ContainerComponent>
      <Toaster />
    </>
  );
}
