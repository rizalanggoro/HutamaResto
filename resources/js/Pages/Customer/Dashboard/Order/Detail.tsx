import BreadcrumbComponent from "@/Components/Breadcrumb";
import { Card, CardFooter, CardHeader } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
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
import { PageProps } from "@/types";
import { Franchise, Menu, Order, OrderItem } from "@/types/models";
import { Head } from "@inertiajs/react";
import { User } from "lucide-react";

export default function Page(
  props: PageProps<{
    order: Order & {
      franchise: Franchise;
      order_items: (OrderItem & {
        menu: Menu;
      })[];
    };
  }>,
) {
  return (
    <>
      <Head title="Detail Pesanan" />
      <DashboardCustomerLayout>
        <div>
          <BreadcrumbComponent
            items={[
              { title: "Halaman utama", href: route("dashboard") },
              { title: "Pesanan saya", href: route("dashboard.order") },
              { title: "Detail pesanan" },
            ]}
          />
          <p className="mt-4 font-semibold text-2xl">Detail Pesanan</p>
          <p className="text-muted-foreground mt-2">
            Berikut detail informasi dari pesanan yang Anda lakukan
          </p>

          <div className="max-w-xl mt-8 space-y-2">
            <Card>
              <CardHeader className="space-y-4">
                <Label>Anda melakukan pemesanan sebagai</Label>
                <div className="flex items-center gap-4">
                  <div className="h-12 border rounded-full w-12 flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{props.auth.user.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {props.auth.user.email}
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="space-y-2">
                <p className="text-lg font-semibold">
                  {props.order.franchise.name}
                </p>
                <p className="text-muted-foreground">
                  Berikut beberapa daftar makanan dan minuman yang Anda pesan
                </p>
              </CardHeader>

              <CardFooter>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No</TableHead>
                      <TableHead>Nama</TableHead>
                      <TableHead>Jumlah</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {props.order.order_items.map((item, index) => (
                      <TableRow key={"order-item-" + index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.menu.name}</TableCell>
                        <TableCell>{item.count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={2}>Total</TableCell>
                      <TableCell>
                        {props.order.order_items.reduce(
                          (prev, current) => prev + current.count,
                          0,
                        )}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </CardFooter>
            </Card>
          </div>
        </div>
      </DashboardCustomerLayout>
    </>
  );
}
