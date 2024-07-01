import BreadcrumbComponent from "@/Components/Breadcrumb";
import { Button } from "@/Components/ui/button";
import { Card } from "@/Components/ui/card";
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
import { Eye, ReceiptText } from "lucide-react";

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
          <div className="mt-4 space-y-2">
            <p className="font-semibold text-2xl">Daftar Pesanan</p>
            <p className="text-muted-foreground">
              Berikut adalah daftar pesanan yang memerlukan penyelesaian segera
              untuk memastikan kelancaran dan kepuasan pelanggan.
            </p>
          </div>

          <div className="mt-8 flex justify-end gap-1">
            <Button variant={"outline"} asChild>
              <Link href={route("admin.dashboard.order.paymentVerification")}>
                <ReceiptText className="w-4 h-4 mr-2" />
                Verifikasi pembayaran
              </Link>
            </Button>
          </div>
          <Card className="mt-4 overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/70">
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Nama pemesan</TableHead>
                  <TableHead>Jumlah</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              {props.orders.length === 0 && (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      Tidak ada data
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
              {props.orders.length > 0 && (
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
              )}
            </Table>
          </Card>
        </div>
      </DashboardAdminLayout>
    </>
  );
}
