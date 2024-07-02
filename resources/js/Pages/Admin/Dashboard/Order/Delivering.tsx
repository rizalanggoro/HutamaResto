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
import { Eye } from "lucide-react";

export default function Page(
  props: PageProps<{
    orders: (Order & { user: User })[];
  }>,
) {
  return (
    <>
      <Head title="Pengantaran" />
      <DashboardAdminLayout>
        <div className="max-w-lg">
          <BreadcrumbComponent
            items={[
              { title: "Halaman utama", href: route("admin.dashboard") },
              { title: "Daftar pesanan", href: route("admin.dashboard.order") },
              { title: "Pengantaran" },
            ]}
          />
          <div className="mt-4 space-y-2">
            <p className="text-2xl font-semibold">Pengantaran</p>
            <p className="text-muted-foreground">
              Berikut beberapa pesanan yang sedang diantarkan oleh kurir menuju
              lokasi pelanggan
            </p>
          </div>

          <Card className="mt-8 overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/70">
                <TableRow>
                  <TableHead>Pemesan</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {props.orders.length > 0 ? (
                  props.orders.map((order, index) => (
                    <TableRow key={"delivering-item-" + index}>
                      <TableCell>
                        <p className="font-medium">{order.user.name}</p>
                        <p className="text-muted-foreground">
                          {order.user.address}
                        </p>
                      </TableCell>
                      <TableCell className="flex items-center gap-1">
                        <Button variant={"outline"} size={"icon"} asChild>
                          <Link
                            href={route(
                              "admin.dashboard.order.delivering.detail",
                              {
                                id: order.id,
                              },
                            )}
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center">
                      Tidak ada data
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </div>
      </DashboardAdminLayout>
    </>
  );
}
