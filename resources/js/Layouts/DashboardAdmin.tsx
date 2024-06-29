import { Button } from "@/Components/ui/button";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Separator } from "@/Components/ui/separator";
import { useTheme } from "@/Providers/Theme";
import { User } from "@/types/models";
import { Link, usePage } from "@inertiajs/react";
import {
  Home,
  Info,
  ListChecks,
  LogOut,
  MessageSquare,
  Moon,
  Sun,
  UserCog,
  UtensilsCrossed,
} from "lucide-react";
import React, { PropsWithChildren } from "react";

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
  {
    title: "Daftar ulasan",
    route: "admin.dashboard.review",
    icon: <MessageSquare className="w-4 h-4" />,
  },
  {
    title: "Profil restoran",
    route: "admin.dashboard.profile",
    icon: <Info className="w-4 h-4" />,
  },
  {
    title: "Kelola admin",
    route: "admin.dashboard.manageAdmin",
    icon: <UserCog className="w-4 h-4" />,
  },
];

export default function DashboardAdminLayout({ children }: PropsWithChildren) {
  const {
    auth: { user },
  } = usePage<{ auth: { user: User | null } }>().props;
  const { theme, setTheme } = useTheme();

  const onClickButtonSwitchTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      {/* <NavbarComponent variant="xl" /> */}
      <div className="h-screen flex">
        <div className="flex-1 h-screen flex flex-col">
          <div className="h-16 flex items-center px-4 justify-between">
            <p className="font-semibold text-lg text-transparent bg-clip-text bg-gradient-to-r to-teal-600 from-primary">
              HutamaResto
            </p>

            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={onClickButtonSwitchTheme}
            >
              {theme === "light" ? (
                <Moon className={"w-4 h-4"} />
              ) : (
                <Sun className={"w-4 h-4"} />
              )}
            </Button>
          </div>
          <Separator orientation="horizontal" />
          <ScrollArea className="w-full flex-1">
            <div className="flex flex-col py-4 gap-1 px-4">
              {[...menus].map((menu, index) => (
                <Button
                  key={"dashboard-admin-navigation-item-" + index}
                  asChild
                  size={"default"}
                  variant={route().current(menu.route) ? "secondary" : "link"}
                  className="justify-start text-foreground"
                >
                  <Link href={route(menu.route)}>
                    <div className="mr-4">{menu.icon}</div>
                    {menu.title}
                  </Link>
                </Button>
              ))}
            </div>
          </ScrollArea>
          <Separator orientation="horizontal" />
          <div className="p-4">
            {/* profile */}
            <div className="flex gap-4 items-center">
              {/* <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar> */}
              <div>
                <p className="font-semibold">{user?.name}</p>
                <p className="text-muted-foreground text-sm">{user?.email}</p>
              </div>
            </div>

            {/* logout */}
            <Button asChild variant={"destructive"} className="w-full mt-4">
              <Link href={route("logout")} method="post" as="button">
                <LogOut className="w-4 h-4 mr-4" />
                Keluar
              </Link>
            </Button>
          </div>
        </div>

        <Separator orientation="vertical" />

        <div className="flex-[4] bg-muted/40">
          <ScrollArea type="always" className="w-full h-full">
            <div className="p-8">{children}</div>
          </ScrollArea>
        </div>
      </div>
    </>
  );
}
