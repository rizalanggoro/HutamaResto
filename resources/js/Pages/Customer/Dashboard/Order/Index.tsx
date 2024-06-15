import BreadcrumbComponent from "@/Components/Breadcrumb";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import DashboardCustomerLayout from "@/Layouts/DashboardCustomer";
import { PageProps } from "@/types";
import { Franchise, Order } from "@/types/models";
import { Head, Link } from "@inertiajs/react";
import { Eye, PenLine, Trash2 } from "lucide-react";

export default function Page(
  props: PageProps<{
    orders: (Order & {
      franchise: Franchise;
    })[];
  }>
) {
  return (
    <>
      <Head>
        <title>Dashboard: Pesanan saya</title>
      </Head>

      <DashboardCustomerLayout>
        <div className="py-8">
          <BreadcrumbComponent
            items={[
              {
                title: "Halaman utama",
                href: route("dashboard"),
              },
              { title: "Pesanan saya" },
            ]}
          />
          <div className="flex justify-between items-center">
            <p className="text-2xl font-semibold mt-4">Pesanan Saya</p>
            <Button asChild>
              <Link href={route("dashboard.order.create")}>
                <PenLine className="w-4 h-4 mr-2" />
                Baru
              </Link>
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Nama Resto</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {props.orders.map((order, index) => (
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{order.franchise.name}</TableCell>
                  <TableCell>
                    <Badge variant={"outline"}>Selesai</Badge>
                  </TableCell>
                  <TableCell className="flex gap-1 items-center">
                    <Button asChild variant={"outline"} size={"icon"}>
                      <Link
                        href={route("dashboard.order.detail", {
                          id_order: order.id,
                        })}
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button variant={"destructive"} size={"icon"}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DashboardCustomerLayout>
    </>
  );
}
