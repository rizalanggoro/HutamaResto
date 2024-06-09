import BreadcrumbComponent from "@/Components/Breadcrumb";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/Components/ui/alert-dialog";
import { Button } from "@/Components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { useToast } from "@/Components/ui/use-toast";
import DashboardAdminLayout from "@/Layouts/DashboardAdmin";
import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import axios from "axios";
import { Edit2, Loader2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

type Props = {
    franchise: {
        name: string;
    };
    menus: {
        id: number;
        name: string;
        description: string;
        availability: boolean;
        type: string;
    }[];
};

export default function Page(props: Props) {
    const [menus, setMenus] = useState(props.menus);
    const [filter, setFilter] = useState("all");
    const [dialogDeleteMenu, setDialogDeleteMenu] = useState({
        isOpen: false,
        isLoading: false,
        id: -1,
        name: "",
    });
    const [dialogUpdateMenuAvailability, setDialogUpdateMenuAvailability] =
        useState({
            isOpen: false,
            isLoading: false,
            id: -1,
            name: "",
            availability: false,
        });
    const { toast } = useToast();

    const onClickButtonDelete = async () => {
        try {
            setDialogDeleteMenu({
                ...dialogDeleteMenu,
                isLoading: true,
            });
            await axios.delete(
                route("admin.dashboard.menu.delete", {
                    id: dialogDeleteMenu.id,
                })
            );
            setMenus(menus.filter((it) => it.id !== dialogDeleteMenu.id));
        } catch (e) {
            toast({
                title: "Error",
                description:
                    "Terjadi kesalahan tidak terduga! Silahkan coba lagi",
            });
        } finally {
            setDialogDeleteMenu({
                ...dialogDeleteMenu,
                isOpen: false,
                isLoading: false,
            });
        }
    };

    const onClickButtonUpdateMenuAvailability = async () => {
        try {
            setDialogUpdateMenuAvailability({
                ...dialogUpdateMenuAvailability,
                isLoading: true,
            });
            await axios.patch(
                route("admin.dashboard.menu.patch.availability", {
                    id: dialogUpdateMenuAvailability.id,
                }),
                { availability: !dialogUpdateMenuAvailability.availability }
            );
            setMenus(
                menus.map((it) => {
                    if (it.id === dialogUpdateMenuAvailability.id)
                        return {
                            ...it,
                            availability:
                                !dialogUpdateMenuAvailability.availability,
                        } as typeof it;
                    else return it;
                })
            );
        } catch (e) {
            toast({
                title: "Error",
                description:
                    "Terjadi kesalahan tidak terduga! Silahkan coba lagi",
            });
        } finally {
            setDialogUpdateMenuAvailability({
                ...dialogUpdateMenuAvailability,
                isOpen: false,
                isLoading: false,
            });
        }
    };

    return (
        <>
            <DashboardAdminLayout>
                <div className="py-8 pr-2">
                    <BreadcrumbComponent
                        items={[
                            {
                                title: "Halaman utama",
                                href: "/admin/dashboard",
                            },
                            {
                                title: "Daftar menu",
                            },
                        ]}
                    />

                    <p className="text-2xl font-semibold mt-4">Daftar Menu</p>
                    <p>
                        Berikut daftar makanan dan minuman yang terdapat pada{" "}
                        {props.franchise.name}
                    </p>

                    <div className="flex justify-between items-center mt-8">
                        <Tabs
                            defaultValue={filter}
                            onValueChange={(e) => setFilter(e)}
                        >
                            <TabsList>
                                <TabsTrigger value="all">Semua</TabsTrigger>
                                <TabsTrigger value="food">Makanan</TabsTrigger>
                                <TabsTrigger value="beverage">
                                    Minuman
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>

                        <Button asChild>
                            <Link href="/admin/dashboard/menu/create">
                                <Plus className="w-4 h-4 mr-2" />
                                Tambah menu
                            </Link>
                        </Button>
                    </div>

                    <Table className="mt-4">
                        <TableHeader>
                            <TableRow>
                                <TableHead>No</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead>Deskripsi</TableHead>
                                <TableHead>Ketersediaan</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {menus
                                .filter((it) => {
                                    if (filter === "all") return it;
                                    else if (filter === "food")
                                        return it.type === "food";
                                    else return it.type === "beverage";
                                })
                                .map((menu, index) => (
                                    <TableRow
                                        className={cn(
                                            menu.availability || "bg-muted"
                                        )}
                                    >
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell
                                            className={cn(
                                                menu.availability ||
                                                    "line-through"
                                            )}
                                        >
                                            {menu.name}
                                        </TableCell>
                                        <TableCell
                                            className={cn(
                                                menu.availability ||
                                                    "line-through"
                                            )}
                                        >
                                            {menu.description}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                size={"sm"}
                                                variant={
                                                    menu.availability
                                                        ? "secondary"
                                                        : "ghost"
                                                }
                                                onClick={() =>
                                                    setDialogUpdateMenuAvailability(
                                                        {
                                                            ...dialogUpdateMenuAvailability,
                                                            isOpen: true,
                                                            id: menu.id,
                                                            name: menu.name,
                                                            availability:
                                                                menu.availability,
                                                        }
                                                    )
                                                }
                                            >
                                                {menu.availability
                                                    ? "Tersedia"
                                                    : "Tidak tersedia"}
                                            </Button>
                                        </TableCell>
                                        <TableCell className="flex gap-1">
                                            <Button
                                                size={"icon"}
                                                variant={"secondary"}
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                size={"icon"}
                                                variant={"destructive"}
                                                onClick={() =>
                                                    setDialogDeleteMenu({
                                                        ...dialogDeleteMenu,
                                                        isOpen: true,
                                                        id: menu.id,
                                                        name: menu.name,
                                                    })
                                                }
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </div>
            </DashboardAdminLayout>

            {/* dialog update ketersediaan menu */}
            <AlertDialog
                open={dialogUpdateMenuAvailability.isOpen}
                onOpenChange={(e) =>
                    setDialogUpdateMenuAvailability({
                        ...dialogUpdateMenuAvailability,
                        isOpen: e,
                    })
                }
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Ketersediaan menu</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin akan mengubah ketersediaan menu{" "}
                            <span className="font-semibold">
                                {dialogUpdateMenuAvailability.name}
                            </span>{" "}
                            menjadi{" "}
                            <span className="font-semibold">
                                {dialogUpdateMenuAvailability.availability
                                    ? "tidak tersedia"
                                    : "tersedia"}
                            </span>
                            ?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            disabled={dialogUpdateMenuAvailability.isLoading}
                        >
                            Batal
                        </AlertDialogCancel>
                        <Button
                            onClick={() =>
                                onClickButtonUpdateMenuAvailability()
                            }
                            disabled={dialogUpdateMenuAvailability.isLoading}
                        >
                            {dialogUpdateMenuAvailability.isLoading && (
                                <Loader2 className="animate-spin mr-2 w-4 h-4" />
                            )}
                            Ubah
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* dialog konfirmasi hapus menu */}
            <AlertDialog
                open={dialogDeleteMenu.isOpen}
                onOpenChange={(e) =>
                    setDialogDeleteMenu({
                        ...dialogDeleteMenu,
                        isOpen: e,
                    })
                }
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Konfirmasi hapus menu
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin akan menghapus menu{" "}
                            <span className="font-semibold">
                                {dialogDeleteMenu.name}
                            </span>{" "}
                            dari database? Tindakan Anda bersifat permanen dan
                            tidak dapat dipulihkan
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            disabled={dialogDeleteMenu.isLoading}
                        >
                            Batal
                        </AlertDialogCancel>
                        <Button
                            disabled={dialogDeleteMenu.isLoading}
                            variant={"destructive"}
                            onClick={() => onClickButtonDelete()}
                        >
                            {dialogDeleteMenu.isLoading && (
                                <Loader2 className="animate-spin mr-2 w-4 h-4" />
                            )}
                            Hapus
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
