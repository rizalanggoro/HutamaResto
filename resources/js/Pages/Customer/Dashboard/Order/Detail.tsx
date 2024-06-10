import BreadcrumbComponent from "@/Components/Breadcrumb";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import DashboardCustomerLayout from "@/Layouts/DashboardCustomer";
import { Franchise, Menu, Order, OrderItem } from "@/types/models";

type Props = {
    order: Order & {
        franchise: Franchise;
        order_items: (OrderItem & {
            menu: Menu;
        })[];
    };
};

export default function Page(props: Props) {
    return (
        <>
            <DashboardCustomerLayout>
                <div className="py-8 pr-2">
                    <BreadcrumbComponent
                        items={[
                            {
                                title: "Halaman utama",
                                href: route("dashboard"),
                            },
                            {
                                title: "Pesanan saya",
                                href: route("dashboard.order"),
                            },
                            {
                                title: "Detail pesanan",
                            },
                        ]}
                    />
                    <p className="mt-4 font-semibold text-2xl">
                        Detail Pesanan
                    </p>
                    <p>
                        Berikut detail informasi dari pesanan yang Anda lakukan
                    </p>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">
                                {props.order.franchise.name}
                            </CardTitle>
                            <CardDescription>
                                Berikut beberapa daftar makanan dan minuman yang
                                Anda pesan
                            </CardDescription>
                        </CardHeader>

                        <CardFooter>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>Jumlah</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {props.order.order_items.map(
                                        (item, index) => (
                                            <TableRow>
                                                <TableCell>
                                                    {item.menu.name}
                                                </TableCell>
                                                <TableCell>
                                                    {item.count}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell>Total</TableCell>
                                        <TableCell>
                                            {props.order.order_items.reduce(
                                                (prev, current) =>
                                                    prev + current.count,
                                                0
                                            )}
                                        </TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </CardFooter>
                    </Card>
                </div>
            </DashboardCustomerLayout>
        </>
    );
}
