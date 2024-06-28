import BreadcrumbComponent from "@/Components/Breadcrumb";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/Components/ui/alert-dialog";
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
import useServerPooling from "@/Hooks/server-pooling";
import DashboardAdminLayout from "@/Layouts/DashboardAdmin";
import { PageProps } from "@/types";
import { Menu, Order, OrderItem, User } from "@/types/models";
import { Head, router, useForm } from "@inertiajs/react";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { FormattedNumber } from "react-intl";

type CustomOrder = Order & {
  user: User;
  order_items: (OrderItem & { menu: Menu })[];
};

export default function Page(
  props: PageProps<{
    orders: CustomOrder[];
  }>,
) {
  useServerPooling();

  const [isDialogConfirmPaymentOpen, setIsDialogConfirmPaymentOpen] =
    useState(false);
  const [selectedOrder, setSelectedOrder] = useState<
    CustomOrder & { number: number }
  >();

  const formVerify = useForm();
  const onClickButtonVerify = () => {
    formVerify.patch(
      route("admin.dashboard.order.verifyPayment", {
        orderId: selectedOrder?.id,
      }),
      {
        onSuccess: () => router.reload(),
        onFinish: () => {
          setIsDialogConfirmPaymentOpen(false);
          setSelectedOrder(undefined);
        },
      },
    );
  };

  return (
    <>
      <Head title="Verifikasi Pembayaran" />
      <DashboardAdminLayout>
        <div>
          <BreadcrumbComponent
            items={[
              { title: "Halaman utama", href: route("admin.dashboard") },
              { title: "Daftar pesanan", href: route("admin.dashboard.order") },
              { title: "Verifikasi pembayaran" },
            ]}
          />
          <div className="mt-4 space-y-2">
            <p className="text-2xl font-semibold">Verifikasi Pembayaran</p>
            <p className="text-muted-foreground">
              Berikut adalah beberapa pesanan yang telah masuk dan saat ini
              menunggu konfirmasi pembayaran
            </p>
          </div>

          <Card className="mt-8 overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/70">
                <TableRow>
                  <TableHead>Nama Pemesan</TableHead>
                  <TableHead>Total Menu</TableHead>
                  <TableHead>Total Harga</TableHead>
                  <TableHead>Bukti Pembayaran</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {props.orders.map((order, index) => (
                  <TableRow key={"order-item-" + index}>
                    <TableCell>{order.user.name}</TableCell>
                    <TableCell>
                      {order.order_items.reduce(
                        (prev, curr) => prev + curr.count,
                        0,
                      )}
                    </TableCell>
                    <TableCell>
                      <FormattedNumber
                        value={order.order_items.reduce(
                          (prev, curr) => prev + curr.menu.price,
                          0,
                        )}
                        style="currency"
                        currency="IDR"
                      />
                    </TableCell>
                    <TableCell>sama aja blom ada</TableCell>
                    <TableCell>
                      <Button
                        variant={"outline"}
                        size={"icon"}
                        onClick={() => {
                          setIsDialogConfirmPaymentOpen(true);
                          setSelectedOrder({ ...order, number: index + 1 });
                        }}
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </DashboardAdminLayout>

      {/* dialog confirm payment verification */}
      <AlertDialog
        open={isDialogConfirmPaymentOpen}
        onOpenChange={(e) => setIsDialogConfirmPaymentOpen(e)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Pembayaran</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin akan memverifikasi pembayaran{" "}
              <span className="font-semibold">
                nomor {selectedOrder?.number ?? -1}
              </span>{" "}
              atas nama{" "}
              <span className="font-semibold">
                {selectedOrder?.user.name ?? "-"}
              </span>{" "}
              dengan nominal <span className="font-semibold">blom ada</span>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={formVerify.processing}>
              Batal
            </AlertDialogCancel>
            <Button
              onClick={onClickButtonVerify}
              disabled={formVerify.processing}
            >
              {formVerify.processing && (
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
              )}
              Verifikasi
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
