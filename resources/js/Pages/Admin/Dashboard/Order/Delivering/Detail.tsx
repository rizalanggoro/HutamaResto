import BreadcrumbComponent from "@/Components/Breadcrumb";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Checkbox } from "@/Components/ui/checkbox";
import { Label } from "@/Components/ui/label";
import { Separator } from "@/Components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import DashboardAdminLayout from "@/Layouts/DashboardAdmin";
import { PageProps } from "@/types";
import { Franchise, Menu, Order, OrderItem, User } from "@/types/models";
import { Head, router, useForm } from "@inertiajs/react";
import { CheckCheck, Loader2 } from "lucide-react";
import { FormattedDate } from "react-intl";

export default function Page(
  props: PageProps<{
    order: Order & {
      user: User;
      franchise: Franchise;
      order_items: (OrderItem & { menu: Menu })[];
    };
  }>,
) {
  const formMarkAsDone = useForm();

  return (
    <>
      <Head title="Detail Pesanan" />
      <DashboardAdminLayout>
        <div>
          <BreadcrumbComponent
            items={[
              { title: "Halaman utama", href: route("admin.dashboard") },
              { title: "Daftar pesanan", href: route("admin.dashboard.order") },
              {
                title: "Pengantaran",
                href: route("admin.dashboard.order.delivering"),
              },
              { title: "Detail pesanan" },
            ]}
          />
          <div className="mt-4 space-y-2">
            <p className="text-2xl font-semibold">Detail Pesanan</p>
            <p className="text-muted-foreground">
              Berikut adalah daftar pesanan yang membutuhkan tindakan segera
              untuk memastikan semua pelanggan menerima layanan tepat waktu dan
              memuaskan.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <Card className="overflow-hidden h-fit">
              <Table>
                <TableHeader className="bg-muted/70">
                  <TableRow>
                    <TableHead className="w-12 text-center">#</TableHead>
                    <TableHead>Menu</TableHead>
                    <TableHead>Jumlah</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {props.order.order_items.map((orderItem, index) => (
                    <TableRow key={"order-item-" + index}>
                      <TableCell className="text-center px-0">
                        <Checkbox checked={orderItem.is_done === 1} />
                      </TableCell>
                      <TableCell>{orderItem.menu.name}</TableCell>
                      <TableCell>{orderItem.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell>
                      {props.order.order_items.reduce(
                        (prev, curr) => prev + curr.count,
                        0,
                      )}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </Card>

            <div>
              <div className="sticky top-8">
                <Card>
                  <CardHeader className="bg-muted/70">
                    <CardTitle className="text-lg">
                      {props.order.franchise.name}
                    </CardTitle>
                    <CardDescription>
                      <FormattedDate
                        value={props.order.created_at}
                        dateStyle="full"
                      />
                    </CardDescription>
                  </CardHeader>

                  <div className="p-6 space-y-2">
                    <div className="text-sm flex items-center justify-between">
                      <Label>Jenis pemesanan</Label>
                      <p className="text-muted-foreground">
                        {props.order.type === "dine-in"
                          ? "Makan di tempat"
                          : "Pesan antar"}
                      </p>
                    </div>
                    <div>
                      <Label>Pesan tambahan</Label>
                      <p className="text-sm text-muted-foreground">
                        {props.order.message ?? "Tidak ada"}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="p-6">
                    <Label>Informasi Pemesan</Label>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <p>Nama</p>
                        <p className="text-foreground font-medium">
                          {props.auth.user.name}
                        </p>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <p>Email</p>
                        <p className="text-foreground font-medium">
                          {props.auth.user.email}
                        </p>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <p>Alamat</p>
                        <p className="text-foreground font-medium">
                          {props.auth.user.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
                <div className="mt-4 flex justify-end">
                  <Button
                    onClick={() => {
                      formMarkAsDone.patch(
                        route("admin.dashboard.order.delivering.markAsDone", {
                          id: props.order.id,
                        }),
                        {
                          onSuccess: () =>
                            router.visit(
                              route("admin.dashboard.order.delivering"),
                            ),
                        },
                      );
                    }}
                    disabled={formMarkAsDone.processing}
                  >
                    {formMarkAsDone.processing ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <CheckCheck className="w-4 h-4 mr-2" />
                    )}
                    Tandai selesai
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardAdminLayout>
    </>
  );
}
