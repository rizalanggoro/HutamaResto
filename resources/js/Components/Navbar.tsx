import { Button } from "@/Components/ui/button";
import { useTheme } from "@/Providers/Theme";
import { cn } from "@/lib/utils";
import { User } from "@/types/models";
import { Link, usePage } from "@inertiajs/react";
import { LayoutGrid, LogIn, LogOut, Moon, Sun } from "lucide-react";
import { PropsWithChildren } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const maxW = {
  xs: "max-w-[480px]",
  sm: "max-w-[512px]",
  md: "max-w-[768px]",
  lg: "max-w-[1024px]",
  xl: "max-w-[1280px]",
};

const menus = [
  { title: "Restoran", route: "home.franchise" },
  { title: "Menu", route: "home.menu" },
];

export default function NavbarComponent({
  variant = "lg",
  ...props
}: PropsWithChildren<{
  variant?: "xs" | "sm" | "md" | "lg" | "xl";
}>) {
  const sharedProps = usePage<{ auth: { user: User | null } }>().props;
  const { theme, setTheme } = useTheme();

  const onClickButtonSwitchTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <header className="bg-background/70 border-b backdrop-blur fixed w-full top-0 h-16 z-50">
        <nav
          className={cn(
            "h-16 items-center flex mx-auto px-4 justify-between",
            maxW[variant],
          )}
        >
          <Button
            variant={"link"}
            className="font-semibold text-foreground px-0"
          >
            <Link href={route("home")}>HutamaResto</Link>
          </Button>

          <div>
            {menus.map((menu, index) => (
              <Button
                asChild
                key={"menu-item-" + index}
                variant={"link"}
                className={cn(
                  "text-muted-foreground",
                  route().current(menu.route) && "text-primary",
                )}
              >
                <Link href={route(menu.route)}>{menu.title}</Link>
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-2">
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

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {sharedProps.auth.user ? (
                  <>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={route("dashboard")}>
                        <LayoutGrid className="w-4 h-4 mr-2" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={route("logout")}
                        method="post"
                        as={"button"}
                        className="w-full"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Keluar
                      </Link>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem asChild>
                    <Link href={route("login")}>
                      <LogIn className="w-4 h-4 mr-2" />
                      Masuk
                    </Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </header>
    </>
  );
}
