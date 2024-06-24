import BreadcrumbComponent from "@/Components/Breadcrumb";
import { Button } from "@/Components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import DashboardAdminLayout from "@/Layouts/DashboardAdmin";
import { PageProps } from "@/types";
import { Order, User } from "@/types/models";
import { Head, Link } from "@inertiajs/react";
import { Eye, Plus, ReceiptText } from "lucide-react";

export default function Page(
  props: PageProps<{
    orders: (Order & { user: User; order_items_count: number })[];
  }>,
) {
  return (
    <>
      <Head title="Daftar Pesanan" />

      <DashboardAdminLayout>
        <div>
          <BreadcrumbComponent
            items={[
              { title: "Halaman utama", href: route("admin.dashboard") },
              { title: "Daftar pesanan" },
            ]}
          />
          <div className="flex items-center gap-4 justify-between">
            <div>
              <p className={"font-semibold text-2xl mt-4"}>Daftar Pesanan</p>
              <p>
                Berikut adalah daftar pesanan yang memerlukan penyelesaian
                segera untuk memastikan kelancaran dan kepuasan pelanggan.
              </p>
            </div>

            <div className="flex items-center gap-1">
              <Button size={"icon"} variant={"outline"} asChild>
                <Link href={route("admin.dashboard.order.paymentVerification")}>
                  <ReceiptText className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant={"outline"}>
                <Plus className="w-4 h-4 mr-2" />
                Tambah
              </Button>
            </div>
          </div>

          <Table className="mt-8">
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Nama pemesan</TableHead>
                <TableHead>Jumlah</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {props.orders.map((order, index) => (
                <TableRow key={"order-item-" + index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{order.user.name}</TableCell>
                  <TableCell>{order.order_items_count}</TableCell>
                  <TableCell className={"flex items-center gap-1"}>
                    <Button variant={"outline"} size={"icon"} asChild>
                      <Link
                        href={route("admin.dashboard.order.detail", {
                          orderId: order.id,
                        })}
                      >
                        <Eye className={"w-4 h-4"} />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DashboardAdminLayout>
    </>
  );
}
