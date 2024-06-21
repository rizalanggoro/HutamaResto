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
import { Check } from "lucide-react";

export default function Page(
  props: PageProps<{
    orders: (Order & { user: User })[];
  }>
) {
  return (
    <>
      <DashboardAdminLayout>
        <div className="py-8 pr-2">
          <BreadcrumbComponent
            items={[
              { title: "Halaman utama", href: route("admin.dashboard") },
              { title: "Verifikasi pembayaran" },
            ]}
          />
          <p className="text-2xl font-semibold mt-4">Verifikasi Pembayaran</p>

          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Nama pemesan</TableHead>
                  <TableHead>Bukti</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {props.orders.map((order, index) => (
                  <TableRow>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{order.user.name}</TableCell>
                    <TableCell>
                      <img
                        src={order.receipt_path}
                        className="h-32 object-cover"
                      />
                    </TableCell>
                    <TableCell>
                      <Button variant={'outline'} size={'icon'}>
                        <Check className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DashboardAdminLayout>
    </>
  );
}
