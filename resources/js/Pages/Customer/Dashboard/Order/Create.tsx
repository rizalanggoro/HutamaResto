import BreadcrumbComponent from "@/Components/Breadcrumb";
import { Button } from "@/Components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import DashboardCustomerLayout from "@/Layouts/DashboardCustomer";
import { Franchise, Menu } from "@/types/models";
import { router } from "@inertiajs/react";
import axios from "axios";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
    franchises: Franchise[];
};

type MenuItem = Menu & {
    count: number;
};

export default function Page(props: Props) {
    const [selectedIdFranchise, setSelectedIdFranchise] = useState("");
    const [menus, setMenus] = useState<MenuItem[]>([]);

    useEffect(() => {
        const fetchMenus = async () => {
            if (selectedIdFranchise) {
                try {
                    const response = await axios.get(
                        route("dashboard.order.create.franchise.menu", {
                            id_franchise: selectedIdFranchise,
                        })
                    );
                    const { data } = response;
                    setMenus(data.menus);
                } catch (e) {}
            }
        };

        fetchMenus();
    }, [selectedIdFranchise]);

    const onClickButtonIncrement = (idMenu: number) => {
        setMenus(
            menus.map((it) => {
                if (it.id === idMenu)
                    return { ...it, count: (it.count ?? 0) + 1 };
                else return it;
            })
        );
    };
    const onClickButtonDecrement = (idMenu: number) => {
        setMenus(
            menus.map((it) => {
                if (it.id === idMenu)
                    return { ...it, count: (it.count ?? 0) - 1 };
                else return it;
            })
        );
    };

    const onClickButtonOrder = async () => {
        try {
            axios
                .post(route("dashboard.order.create"), {
                    id_franchise: Number(selectedIdFranchise),
                    order_items: menus
                        .filter((it) => it.count > 0)
                        .map((it) => {
                            return {
                                id_menu: it.id,
                                count: it.count,
                            };
                        }),
                })
                .then((e) => router.visit(route("dashboard.order")));
        } catch (e) {}
    };

    return (
        <>
            <DashboardCustomerLayout>
                <div className="py-8 pr-2 relative">
                    <BreadcrumbComponent
                        items={[
                            { title: "Halaman utama", href: "/dashboard" },
                            { title: "Pesanan saya", href: "/dashboard/order" },
                            {
                                title: "Pesanan baru",
                                href: "/dashboard/order/create",
                            },
                        ]}
                    />
                    <p className="mt-4 font-semibold text-2xl">
                        Tambah Pesanan Baru
                    </p>
                    <p>
                        Lengkapi beberapa informasi berikut untuk membuat sebuah
                        pesanan baru
                    </p>

                    <Select onValueChange={(e) => setSelectedIdFranchise(e)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih lokasi" />
                        </SelectTrigger>
                        <SelectContent>
                            {props.franchises.map((franchise, index) => (
                                <SelectItem
                                    key={"franchise-select-item-" + index}
                                    value={String(franchise.id)}
                                >
                                    {franchise.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {menus && menus.length > 0 && (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>No</TableHead>
                                    <TableHead>Nama</TableHead>
                                    <TableHead>Deskripsi</TableHead>
                                    <TableHead>Jumlah</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {menus.map((menu, index) => (
                                    <TableRow>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{menu.name}</TableCell>
                                        <TableCell>
                                            {menu.description}
                                        </TableCell>
                                        <TableCell className="flex items-center gap-1">
                                            <Button
                                                variant={"outline"}
                                                size={"icon"}
                                                onClick={() =>
                                                    onClickButtonDecrement(
                                                        menu.id
                                                    )
                                                }
                                            >
                                                <Minus className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant={"ghost"}
                                                size={"icon"}
                                            >
                                                {menu.count ?? 0}
                                            </Button>
                                            <Button
                                                variant={"default"}
                                                size={"icon"}
                                                onClick={() =>
                                                    onClickButtonIncrement(
                                                        menu.id
                                                    )
                                                }
                                            >
                                                <Plus className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}

                    {menus && (
                        <>
                            <p className="mt-4">Konfirmasi Pesanan</p>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>No</TableHead>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>Jumlah</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {menus
                                        .filter((it) => it.count > 0)
                                        .map((menu, index) => (
                                            <TableRow>
                                                <TableCell>
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell>
                                                    {menu.name}
                                                </TableCell>
                                                <TableCell>
                                                    {menu.count}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </>
                    )}

                    <Button onClick={onClickButtonOrder}>Konfirmasi</Button>
                </div>
            </DashboardCustomerLayout>
        </>
    );
}
