import DashboardAdminLayout from "@/Layouts/DashboardAdmin";
import BreadcrumbComponent from "@/Components/Breadcrumb";
import {Order, OrderItem, User} from "@/types/models";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/Components/ui/table";
import {Button} from "@/Components/ui/button";
import {Eye} from "lucide-react";

type Props = {
    orders: Order & {
        user: User,
        order_items: OrderItem[],
    }[]
}

export default function Page(props: Props) {
    return <>
        <DashboardAdminLayout>
            <div className={'py-8 pr-2'}>
                <BreadcrumbComponent items={[
                    {title: 'Halaman utama', href: route('admin.dashboard')},
                    {title: 'Daftar pesanan'},
                ]}/>
                <p className={'font-semibold text-2xl mt-4'}>Daftar Pesanan</p>
                <p>Berikut beberapa daftar pesanan yang harus segera diselesaikan</p>

                <Table className={'mt-4'}>
                    <TableHeader>
                        <TableRow>
                            <TableHead>No</TableHead>
                            <TableHead>Nama pemesan</TableHead>
                            <TableHead>Jumlah</TableHead>
                            <TableHead>Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {props.orders.map((order, index) => <TableRow>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{order.user.name}</TableCell>
                            <TableCell>{order.order_items.reduce((prev, current) => prev + current.count, 0)}</TableCell>
                            <TableCell className={'flex items-center gap-1'}>
                                <Button variant={'outline'} size={'icon'}>
                                    <Eye className={'w-4 h-4'}/>
                                </Button>
                            </TableCell>
                        </TableRow>)}
                    </TableBody>
                </Table>
            </div>
        </DashboardAdminLayout>
    </>
}
